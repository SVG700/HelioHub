-- Helios AI - Supabase Database Schema
-- Run these SQL queries in your Supabase SQL Editor to set up the required tables

-- 1. Knowledge Base Table
CREATE TABLE IF NOT EXISTS helios_knowledge (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  confidence TEXT DEFAULT 'Medium' CHECK (confidence IN ('High', 'Medium', 'Low')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Sample data for testing
INSERT INTO helios_knowledge (question, answer, confidence) VALUES
  ('What is solar feasibility?', 'Solar feasibility measures the viability of installing a solar power system at your location based on sunlight availability, roof orientation, and structural capability.', 'High'),
  ('How many panels do I need?', 'The number of solar panels depends on your energy consumption, roof space, and regional sunlight hours. A typical residential system needs 8-15 panels.', 'High'),
  ('What about battery storage?', 'Battery storage (Li-ion recommended) provides backup power during outages and maximizes solar energy utilization. A 6-8 hour backup is ideal for most homes.', 'High'),
  ('What government schemes exist?', 'In India, schemes like PM-KUSUM, MNRE subsidy, and state-specific rooftop solar programs offer 30-40% cost reduction. Check MNRE.gov.in for eligibility.', 'High'),
  ('What is the cost?', 'Solar costs range from ₹1.5-2.5 lakh per kW with installation. Subsidy can reduce this by 30-40%, making payback 5-7 years.', 'Medium');

-- 2. Feedback Table
CREATE TABLE IF NOT EXISTS ai_feedback (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  feedback TEXT NOT NULL CHECK (feedback IN ('good', 'bad')),
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- 3. Query Logs Table (optional)
CREATE TABLE IF NOT EXISTS ai_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_query TEXT NOT NULL,
  ai_response TEXT NOT NULL,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create indexes for faster queries
CREATE INDEX idx_helios_knowledge_question ON helios_knowledge USING GIST (to_tsvector('english', question));
CREATE INDEX idx_ai_feedback_timestamp ON ai_feedback (timestamp);
CREATE INDEX idx_ai_logs_timestamp ON ai_logs (timestamp);

-- Enable Row Level Security (optional, but recommended)
ALTER TABLE helios_knowledge ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_feedback ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_logs ENABLE ROW LEVEL SECURITY;

-- Create policies to allow public read access to knowledge base
CREATE POLICY "Allow public read access to knowledge base"
  ON helios_knowledge
  FOR SELECT
  TO PUBLIC
  USING (true);

-- Allow public insert feedback
CREATE POLICY "Allow public insert feedback"
  ON ai_feedback
  FOR INSERT
  TO PUBLIC
  WITH CHECK (true);

-- Allow public insert logs
CREATE POLICY "Allow public insert logs"
  ON ai_logs
  FOR INSERT
  TO PUBLIC
  WITH CHECK (true);

-- 4. Sensor Readings Table
CREATE TABLE IF NOT EXISTS sensor_readings (
  id bigserial PRIMARY KEY,
  voltage float4 NOT NULL DEFAULT 12.4,
  current_amp float4 NOT NULL DEFAULT 2.1,
  power float4 NOT NULL DEFAULT 26.0,
  temperature float4 NOT NULL DEFAULT 31.0,
  battery_percent int4 NOT NULL DEFAULT 73,
  charge_controller boolean DEFAULT true,
  thermal_guard boolean DEFAULT true,
  load_balancing boolean DEFAULT true,
  emergency_mode boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

GRANT SELECT, INSERT ON sensor_readings TO anon;
GRANT USAGE, SELECT ON SEQUENCE sensor_readings_id_seq TO anon;
