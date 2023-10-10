-- Drop existentes tablas
DROP TABLE IF EXISTS quotations;
DROP TABLE IF EXISTS staff;

-- Crear tablas
CREATE TABLE quotations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  number serial NOT NULL unique,
  company TEXT NOT NULL,
  ruc TEXT NOT NULL,
  address TEXT NOT NULL,
  deadline INT NOT NULL DEFAULT 1,
  phone text,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  items JSONB NOT NULL
);

ALTER SEQUENCE quotations_number_seq RESTART WITH 4000;



CREATE TABLE staff (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id)
);


-- Habilitar RLS en la tabla quotations
ALTER TABLE quotations ENABLE ROW LEVEL SECURITY;

-- Crear política de RLS
CREATE POLICY allow_access_to_staff
  ON quotations
  FOR ALL
  USING (EXISTS (
    SELECT 1
    FROM staff
    WHERE staff.user_id = auth.uid()
  ));

INSERT INTO staff (user_id)
VALUES
  ('50bebaf8-d91b-47f3-b5f6-8978455ee561'),
  ('0a603c42-1612-4093-849d-b4786f4cf495')
  ;

-- Insertar datos en la tabla quotations (corregido)
INSERT INTO quotations (company, address, ruc, items)
VALUES (
  'Productos Quimicos Industriales S.A.C',
  'Av. macarones de la zonf - San Borja',
  '20610555536',
  '[
    {
      "id": "8cde4d39-6b82-4753-9748-a5fc52bcc4f0",
      "qty": 6,
      "price": 36,
      "unit_size": "und",
      "description": "Cono de seguridad de 28 pulgadas ( 70 cm )"
    },
    {
      "id": "10a7c316-7cd6-40af-bf34-c5103b9a772b",
      "qty": 5,
      "price": 25,
      "unit_size": "und",
      "description": "Barra retractil amarillo reflectivo 2.1 mts"
    },
    {
      "id": "d811f4a8-afee-44fc-bfe0-08439c244c27",
      "qty": 4,
      "price": 7.5,
      "unit_size": "20x30cm",
      "description": "Señal fotoluminiscente soporte: pvc celtex 3 mm pictograma: vinil rotulado"
    },
    {
      "id": "a1224688-7baf-437a-8b83-3f078dc21956",
      "qty": 1,
      "price": 18,
      "unit_size": "und",
      "description": "Costo de envio ( Delivery )"
    }
  ]'::jsonb
);

-- Seleccionar todos los datos de la tabla quotations
SELECT * FROM quotations;


