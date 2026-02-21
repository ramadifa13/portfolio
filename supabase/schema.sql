-- ENUMS (Idempotent creation)
DO $$ BEGIN
    CREATE TYPE project_status AS ENUM ('draft', 'published');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE project_role AS ENUM ('solo', 'team');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE project_type AS ENUM ('web', 'mobile', 'internal');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- PROFILES
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  title TEXT,
  bio TEXT,
  avatar_url TEXT,
  resume_url TEXT,
  email TEXT,
  location TEXT,
  github_url TEXT,
  linkedin_url TEXT,
  twitter_url TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- PROJECTS
CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  long_description TEXT,
  tech_stack TEXT[] DEFAULT '{}',
  image_url TEXT,
  additional_images TEXT[] DEFAULT '{}',
  role project_role DEFAULT 'solo',
  project_type project_type DEFAULT 'web',
  status project_status DEFAULT 'draft',
  featured BOOLEAN DEFAULT false,
  live_url TEXT,
  repo_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- EXPERIENCE
CREATE TABLE IF NOT EXISTS experience (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company TEXT NOT NULL,
  position TEXT NOT NULL,
  location TEXT,
  start_date DATE NOT NULL,
  end_date DATE, -- NULL means "Present"
  description TEXT,
  is_current BOOLEAN DEFAULT false,
  technologies TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- SKILLS
CREATE TABLE IF NOT EXISTS skills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  category TEXT NOT NULL, -- e.g., 'Frontend', 'Backend', 'DevOps'
  proficiency INTEGER CHECK (proficiency >= 0 AND proficiency <= 100),
  icon TEXT,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- CERTIFICATIONS
CREATE TABLE IF NOT EXISTS certifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  issuer TEXT NOT NULL,
  issue_date DATE,
  expiry_date DATE,
  credential_id TEXT,
  credential_url TEXT,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS POLICIES
-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE experience ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE certifications ENABLE ROW LEVEL SECURITY;

-- Public read access
CREATE POLICY "Public profiles are viewable by everyone" ON profiles FOR SELECT USING (true);
CREATE POLICY "Published projects are viewable by everyone" ON projects FOR SELECT USING (status = 'published');
CREATE POLICY "Experience is viewable by everyone" ON experience FOR SELECT USING (true);
CREATE POLICY "Skills are viewable by everyone" ON skills FOR SELECT USING (true);
CREATE POLICY "Certifications are viewable by everyone" ON certifications FOR SELECT USING (true);

-- Admin full access
CREATE POLICY "Admins can manage profiles" ON profiles FOR ALL USING (auth.uid() = id);
CREATE POLICY "Admins can manage projects" ON projects FOR ALL USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid()));
CREATE POLICY "Admins can manage experience" ON experience FOR ALL USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid()));
CREATE POLICY "Admins can manage skills" ON skills FOR ALL USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid()));
CREATE POLICY "Admins can manage certifications" ON certifications FOR ALL USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid()));
