-- Create the posts table for SmartWriter AI
-- Run this SQL in your Supabase SQL Editor

-- Enable Row Level Security (RLS)
CREATE TABLE IF NOT EXISTS posts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create an index on user_id for better performance
CREATE INDEX IF NOT EXISTS idx_posts_user_id ON posts(user_id);

-- Create an index on created_at for sorting
CREATE INDEX IF NOT EXISTS idx_posts_created_at ON posts(created_at DESC);

-- Enable Row Level Security
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

-- Create policy to allow users to see only their own posts
CREATE POLICY "Users can view their own posts" ON posts
    FOR SELECT USING (auth.uid() = user_id);

-- Create policy to allow users to insert their own posts
CREATE POLICY "Users can insert their own posts" ON posts
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create policy to allow users to update their own posts
CREATE POLICY "Users can update their own posts" ON posts
    FOR UPDATE USING (auth.uid() = user_id);

-- Create policy to allow users to delete their own posts
CREATE POLICY "Users can delete their own posts" ON posts
    FOR DELETE USING (auth.uid() = user_id);

-- Create a function to automatically update the updated_at column
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create a trigger to automatically update the updated_at column
CREATE TRIGGER update_posts_updated_at 
    BEFORE UPDATE ON posts 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Optional: Create a user_quotas table for usage tracking
CREATE TABLE IF NOT EXISTS user_quotas (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
    remaining_quota INTEGER DEFAULT 5,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS for user_quotas
ALTER TABLE user_quotas ENABLE ROW LEVEL SECURITY;

-- Create policies for user_quotas
CREATE POLICY "Users can view their own quota" ON user_quotas
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own quota" ON user_quotas
    FOR UPDATE USING (auth.uid() = user_id);

-- Create trigger for user_quotas updated_at
CREATE TRIGGER update_user_quotas_updated_at 
    BEFORE UPDATE ON user_quotas 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column(); 