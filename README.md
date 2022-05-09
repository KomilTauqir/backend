create table logging
(
id            int auto_increment
primary key,
ip            varchar(50) not null,
timestamp     datetime    not null,
method        varchar(50) null,
totalRequests int         null,
endpoint      varchar(50) null,
params        varchar(50) null,
constraint table_name_id_uindex
unique (id)
);
