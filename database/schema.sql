begin;

create table robots (
    robot_id integer generated always as identity,
    name varchar(100) not null,
    model varchar(100) not null,
    serial_number varchar(50) not null unique,
    status varchar(20) not null default 'available',
    battery_level integer not null default 100,
    created_at timestamptz not null default current_timestamp,
    updated_at timestamptz not null default current_timestamp,

    constraint ck_robot_status check (status in('available', 'assigned', 'maintenance', 'offline')),
    constraint ck_robot_battery_level check (battery_level between 0 and 100), -- impde de serem inserados na base de dados valores negativos
    constraint pk_robot primary key (robot_id)
);

create table operators(
    operator_id integer generated always as identity,
    name varchar(100) not null,
    email varchar(150) not null,
    specialty varchar(100) not null,
    status varchar(20) not null default 'available',
    created_at timestamptz not null default current_timestamp,
    updated_at timestamptz not null default current_timestamp,

    constraint ck_operator_status check (status in ('available', 'assigned', 'unavailable')),
    constraint pk_operator primary key (operator_id),
    constraint uq_operator_email unique (email)

);

create table missions(
    mission_id integer generated always as identity,
    robot_id integer not null,
    title varchar(120) not null,
    description text,
    location varchar(150) not null,
    status varchar(20) not null default 'planned',
    priority varchar(20) not null default 'medium',
    scheduled_start timestamptz not null,
    scheduled_end timestamptz,
    created_at timestamptz not null default current_timestamp,
    updated_at timestamptz not null default current_timestamp,

    constraint ck_mission_status check(status in ('planned', 'in_progress', 'completed', 'cancelled')),
    constraint ck_mission_priority check(priority in('low', 'medium', 'high', 'critical')),
    constraint ck_mission_schedule check (scheduled_end is null or scheduled_end >= scheduled_start), -- verfica se se existir a data final não pode ser inferior à data de início
    constraint pk_mission primary key (mission_id),
    constraint fk_mission_robot foreign key (robot_id) references robots (robot_id) on delete restrict

);

create table mission_operators(
    mission_id integer not null,
    operator_id integer not null,
    role varchar(50) not null,
    assigned_at timestamptz not null default current_timestamp,

    constraint pk_mission_operator primary key (mission_id, operator_id),
    constraint fk_mission_operator_mission foreign key (mission_id) references missions (mission_id) on delete cascade,
    constraint fk_mission_operator_operator foreign key (operator_id) references operators (operator_id) on delete cascade
);

create table mission_logs(
    mission_log_id integer generated always as identity,
    mission_id integer not null,
    level varchar(20) not null default 'info',
    message text not null,
    created_at timestamptz not null default current_timestamp,

    constraint ck_mission_log_level check(level in ('info', 'warning', 'error')),
    constraint pk_mission_log primary key (mission_log_id),
    constraint fk_mission_log_mission foreign key (mission_id) references missions (mission_id) on delete cascade
);

create index idx_missions_robot_id on missions (robot_id);
create index idx_mission_operators_operator_id on mission_operators (operator_id);
create index idx_mission_logs_mission_id on mission_logs (mission_id); 

-- Estes índices tornam mais rápidas as pesquisas pelas relações.

commit;