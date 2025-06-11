# Exported from Supabase

CREATE TABLE public.course_module (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  course_id bigint,
  name text NOT NULL,
  description text,
  video_link text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT course_module_pkey PRIMARY KEY (id),
  CONSTRAINT course_item_course_id_fkey FOREIGN KEY (course_id) REFERENCES public.courses(id)
);
CREATE TABLE public.courses (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  name text NOT NULL,
  description text,
  parish_id bigint NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT courses_pkey PRIMARY KEY (id),
  CONSTRAINT courses_parish_id_fkey FOREIGN KEY (parish_id) REFERENCES public.parishes(id)
);
CREATE TABLE public.event_ministry (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  event_id bigint NOT NULL,
  person_id bigint,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT event_ministry_pkey PRIMARY KEY (id),
  CONSTRAINT event_ministry_event_id_fkey FOREIGN KEY (event_id) REFERENCES public.events(id)
);
CREATE TABLE public.event_template (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  name text NOT NULL,
  template jsonb,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  parish_id bigint,
  CONSTRAINT event_template_pkey PRIMARY KEY (id),
  CONSTRAINT event_template_parish_id_fkey FOREIGN KEY (parish_id) REFERENCES public.parishes(id)
);
CREATE TABLE public.events (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  name text NOT NULL,
  start_datetime timestamp with time zone NOT NULL,
  end_datetime timestamp with time zone,
  location_id bigint,
  note text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  parish_id bigint,
  CONSTRAINT events_pkey PRIMARY KEY (id),
  CONSTRAINT events_parish_id_fkey FOREIGN KEY (parish_id) REFERENCES public.parishes(id)
);
CREATE TABLE public.locations (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  name text NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  parish_id bigint,
  CONSTRAINT locations_pkey PRIMARY KEY (id),
  CONSTRAINT locations_parish_id_fkey FOREIGN KEY (parish_id) REFERENCES public.parishes(id)
);
CREATE TABLE public.ministries (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  name text NOT NULL,
  description text,
  parish_id bigint,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT ministries_pkey PRIMARY KEY (id),
  CONSTRAINT ministries_parish_id_fkey FOREIGN KEY (parish_id) REFERENCES public.parishes(id)
);
CREATE TABLE public.ministry_roles (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  parish_id bigint NOT NULL,
  name text NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT ministry_roles_pkey PRIMARY KEY (id),
  CONSTRAINT ministry_roles_parish_id_fkey FOREIGN KEY (parish_id) REFERENCES public.parishes(id)
);
CREATE TABLE public.parishes (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  name text NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT parishes_pkey PRIMARY KEY (id)
);
CREATE TABLE public.people (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  first_name text NOT NULL,
  last_name text NOT NULL,
  phone_number text,
  email text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  parish_id bigint,
  user_id uuid,
  person_roles jsonb,
  CONSTRAINT people_pkey PRIMARY KEY (id),
  CONSTRAINT people_parish_id_fkey FOREIGN KEY (parish_id) REFERENCES public.parishes(id),
  CONSTRAINT people_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id)
);
CREATE TABLE public.person_course_progress (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  person_id bigint NOT NULL,
  course_id bigint NOT NULL,
  completed_modules jsonb,
  CONSTRAINT person_course_progress_pkey PRIMARY KEY (id),
  CONSTRAINT person_course_progress_person_id_fkey FOREIGN KEY (person_id) REFERENCES public.people(id),
  CONSTRAINT person_course_progress_course_id_fkey FOREIGN KEY (course_id) REFERENCES public.courses(id)
);
CREATE TABLE public.person_event (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  person_id bigint NOT NULL,
  event_id bigint NOT NULL,
  role text NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT person_event_pkey PRIMARY KEY (id),
  CONSTRAINT person_event_person_id_fkey FOREIGN KEY (person_id) REFERENCES public.people(id),
  CONSTRAINT person_event_event_id_fkey FOREIGN KEY (event_id) REFERENCES public.events(id)
);
CREATE TABLE public.person_ministry (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  person_id bigint NOT NULL,
  ministry_id bigint NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  ministry_roles jsonb,
  CONSTRAINT person_ministry_pkey PRIMARY KEY (id),
  CONSTRAINT person_ministry_person_id_fkey FOREIGN KEY (person_id) REFERENCES public.people(id),
  CONSTRAINT person_ministry_ministry_id_fkey FOREIGN KEY (ministry_id) REFERENCES public.ministries(id)
);
CREATE TABLE public.person_roles (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  name text NOT NULL UNIQUE,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  parish_id bigint,
  CONSTRAINT person_roles_pkey PRIMARY KEY (id),
  CONSTRAINT roles_parish_id_fkey FOREIGN KEY (parish_id) REFERENCES public.parishes(id)
);
CREATE TABLE public.user_parish (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  parish_id bigint NOT NULL,
  user_id uuid NOT NULL,
  CONSTRAINT user_parish_pkey PRIMARY KEY (id),
  CONSTRAINT user_parish_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id),
  CONSTRAINT user_parish_parish_id_fkey FOREIGN KEY (parish_id) REFERENCES public.parishes(id)
);