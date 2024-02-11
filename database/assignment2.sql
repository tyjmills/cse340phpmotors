--1
insert into public.account (account_firstname, account_lastname, account_email, account_password)
values ('Tony', 'Stark', 'tony@starkent.com', 'Iam1ronM@n');

--2
UPDATE public.account
SET account_type = 'Admin'
WHERE account_id = 1;

--3
delete from public.account
where account_id = 1;

--4
update public.inventory
set inv_description = replace(inv_description, 'small interiors', 'a huge interior')
where inv_id = 10;

--5
select i.inv_make, i.inv_model, c.classification_name
from public.inventory i
inner join public.classification c
on i.classification_id = c.classification_id
where c.classification_name = 'Sport';

--6
update public.inventory
set inv_image = replace(inv_image, '/images/', '/images/vehicles/'), inv_thumbnail = replace(inv_thumbnail, '/images/', '/images/vehicles/');