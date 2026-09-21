begin;
 
insert into robots (name, model, serial_number, status, battery_level)
values ('Atlas', 'XR-7', 'RB-ATLAS-001', 'available', 94),
       ('Orion', 'Scout S2', 'RB-ORION-002', 'assigned', 68),
       ('Nova', 'Cargo C1', 'RB-NOVA-003', 'maintenance', 35);


insert into operators (name, email, specialty, status)
values ('Ana Silva', 'ana.silva@example.com', 'Navigation', 'available'),
       ('João Costa', 'joao.costa@example.com', 'Maintenance', 'assigned'),
       ('Marta Ribeiro', 'marta.ribeiro@example.com', 'Data Analysis', 'unavailable');

insert into missions ( robot_id, title, description, location, status, priority, scheduled_start, scheduled_end)
values (1, 'Inspeção do Setor Norte', 'Verificar equipamentos e recolher imagens do setor.', 'Armazém Norte', 'planned', 'high', '2026-09-22 09:00:00+01', '2026-09-22 11:00:00+01'),
       (2, 'Mapeamento do Hangar B', 'Criar um levantamento visual completo do hangar.', 'Hangar B', 'in_progress', 'medium', '2026-09-21 14:00:00+01', null),
       (1, 'Inventário da Zona Técnica', 'Confirmar a localização dos equipamentos técnicos.', 'Zona Técnica', 'completed', 'low', '2026-09-20 10:00:00+01', '2026-09-20 12:30:00+01');

insert into mission_operators( mission_id, operator_id, role)
values (1, 1, 'Mission Lead'),
       (1, 2, 'Technical Support'),
       (2, 2, 'Field Technician'),
       (3, 1, 'Inspector');


insert into mission_logs(mission_id, level, message)
values (1, 'info', 'Missão criada e atribuída à equipa.'),
       (1, 'warning', 'Condições de iluminação abaixo do recomendado.'),
       (2, 'info', 'Mapeamento iniciado no Hangar B.'),
       (2, 'error', 'Falha temporária no sensor de profundidade.'),
       (3, 'info', 'Inventário concluído sem incidentes.');

commit;