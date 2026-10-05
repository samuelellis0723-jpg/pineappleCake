-- =========================================================
-- PineappleCakes: Configuración de Base de Datos y Storage
-- =========================================================

-- 1. Habilitar extensión para UUIDs
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Crear tabla de pasteles (cakes)
CREATE TABLE IF NOT EXISTS public.cakes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    description TEXT,
    image_url TEXT,
    image_path TEXT,
    category TEXT NOT NULL DEFAULT 'Temático Infantil',
    is_published BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 3. Habilitar Row Level Security (RLS)
ALTER TABLE public.cakes ENABLE ROW LEVEL SECURITY;

-- 4. Políticas de Acceso para la tabla 'cakes'

-- 4.1. Lectura pública: CUALQUIER usuario (anónimo o no) puede ver SOLO los pasteles publicados
DROP POLICY IF EXISTS "Public can view published cakes" ON public.cakes;
CREATE POLICY "Public can view published cakes"
    ON public.cakes
    FOR SELECT
    USING (is_published = true);

-- 4.2. Lectura total para administradores autenticados (ver publicados y borradores)
DROP POLICY IF EXISTS "Authenticated admins can view all cakes" ON public.cakes;
CREATE POLICY "Authenticated admins can view all cakes"
    ON public.cakes
    FOR SELECT
    TO authenticated
    USING (true);

-- 4.3. Inserción: Solo usuarios autenticados
DROP POLICY IF EXISTS "Authenticated admins can insert cakes" ON public.cakes;
CREATE POLICY "Authenticated admins can insert cakes"
    ON public.cakes
    FOR INSERT
    TO authenticated
    WITH CHECK (true);

-- 4.4. Modificación: Solo usuarios autenticados
DROP POLICY IF EXISTS "Authenticated admins can update cakes" ON public.cakes;
CREATE POLICY "Authenticated admins can update cakes"
    ON public.cakes
    FOR UPDATE
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- 4.5. Eliminación: Solo usuarios autenticados
DROP POLICY IF EXISTS "Authenticated admins can delete cakes" ON public.cakes;
CREATE POLICY "Authenticated admins can delete cakes"
    ON public.cakes
    FOR DELETE
    TO authenticated
    USING (true);

-- 5. Trigger para actualizar automáticamente el campo `updated_at`
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS on_cake_updated ON public.cakes;
CREATE TRIGGER on_cake_updated
    BEFORE UPDATE ON public.cakes
    FOR EACH ROW
    EXECUTE PROCEDURE public.handle_updated_at();

-- 6. Configuración de Storage Bucket para imágenes de pasteles
-- Inserta el bucket 'cakes' si no existe
INSERT INTO storage.buckets (id, name, public)
VALUES ('cakes', 'cakes', true)
ON CONFLICT (id) DO NOTHING;

-- Políticas de Storage para el bucket 'cakes'
DROP POLICY IF EXISTS "Public Access to Cake Images" ON storage.objects;
CREATE POLICY "Public Access to Cake Images"
    ON storage.objects
    FOR SELECT
    USING (bucket_id = 'cakes');

DROP POLICY IF EXISTS "Authenticated Upload to Cake Images" ON storage.objects;
CREATE POLICY "Authenticated Upload to Cake Images"
    ON storage.objects
    FOR INSERT
    TO authenticated
    WITH CHECK (bucket_id = 'cakes');

DROP POLICY IF EXISTS "Authenticated Update to Cake Images" ON storage.objects;
CREATE POLICY "Authenticated Update to Cake Images"
    ON storage.objects
    FOR UPDATE
    TO authenticated
    USING (bucket_id = 'cakes');

DROP POLICY IF EXISTS "Authenticated Delete from Cake Images" ON storage.objects;
CREATE POLICY "Authenticated Delete from Cake Images"
    ON storage.objects
    FOR DELETE
    TO authenticated
    USING (bucket_id = 'cakes');

-- 7. Datos Iniciales Opcionales (Pasteles iniciales de autor)
INSERT INTO public.cakes (name, description, image_url, category, is_published)
VALUES 
(
    'Aventura Jurásica',
    'Modelado de dinosaurio en fondant, hojas selváticas de azúcar y suave bizcocho artesanal.',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCL40KcZYNTe1hJdC1iSPWf8YGb2XtjAkpZSmIa-YDvl8-pK9XWKdHZmn_iBYN8X6BZjRAaj-botJB_E7k_hLy05zmJxYweoICvebtJHADCTULmvd4BMd1gW4GPDheUpsDsRDdym2TQ2yV09Er4Sr68fjkmjKxvOMuhHvIyVa9BoSVZa0JHuJywQnT9ck6TD2PVZgbZEKIrFfU4Kcb7G4ytj69KLz39W4bW167vyxi_CI93cBXotReS7KIcr3V5qC4B9g',
    'Temático Infantil',
    true
),
(
    'Bluey & Bingo',
    'Creación texturizada en crema de mantequilla artesanal con personajes y sombrero festivo.',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBt1junGGHDDtxT3riTqjjsI8emlRvjFx4C0WtkzQ8gAASf6xPHn01CRjyMNamWqLov6RDvHPHR_QgyVXzG5HlqGiuB6Zbn2BFajLTwzkw0ukIZGrrxXfTg4QdAKU7Z52AAjFnWOYLsCMeDp3GJkK1yLylqy7E0f5ukeNpKldAKB22Olr5PNochcJoRwH_PdrszNUc8IrCse8-5RFN4mtJvXe86Kni7O5rbS5aAkwUkD7131gx1YkB9RQwskWKOet71kw',
    'Crema & Diseño',
    true
),
(
    'Octágono UFC',
    'Tarta esculpida con guante en fondant rojo y ring octagonal satinado en fondant negro.',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuC3HHGzDtxwsJ4NsiV141EyxWh3rzNOC842ylUK1eifMoN9pUa6fdFHBjbOUJKjLwn03iOw2Nm60b0yBBbjlobVNULoWcfM4IxZXtuhNuRCbwPY6opuAn-BWb4N5ayIeWBnIQAs_4arPjNfg4j8pzNrIRpULCAEXjNW5pq38l6NDYZsl-PdKSsAiHTBjuU0VAt8ZUK3ENcLgcbRnh_RTPuT3YZH65T2FWmXCLLGHRFJRWXZj7fpmgQ1PaOgU78s2CLm_A',
    'Edición Deportiva',
    true
),
(
    'Odisea Espacial',
    'Astronauta artesanal, luna en azúcar, cohete dorado y cobertura galáctica con destellos estelares.',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCio-bDnVwoIXMI0D3ez1IupiSxGxpTwI5aYSfQmludiqZfQXgu4Hs_Y4W-Jzvoo36LmQOO0yiM5FeDK3k7j7lQfyyArlwek6xun6PgEDWP5scyDMxw0FZl_QvKIN5ZSvs2fdyujtuMJ7Tu13T9qPmdVQ_DMcUBNPOgtmd9rbaV3uCME9XHRzL1PMyi6rvRFOGuLVlKJZuEaZty24P9qlP3d-QYF5D6tpsD80CYOI697phI-mzQvBdtFoIaO_I_Sfk1ZQ',
    'Fantasía Cósmica',
    true
)
ON CONFLICT DO NOTHING;
