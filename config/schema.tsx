import { integer, json, pgTable, serial, text, varchar } from 'drizzle-orm/pg-core';

export const StoryData = pgTable('story_data', {
    id: serial('id').primaryKey(),
    storyId: varchar('story_id'),
    storySubject: text('story_subject'),
    storyType: varchar('story_type'),
    ageGroup: text('age_group'),
    imageStyle: text('image_style'),
    output: json('output'),
    coverImage: varchar('cover_image'),
    userEmail: varchar('user_email'),
    userName: varchar('user_name'),
    userImage: varchar('user_image'),
});

export const Users = pgTable('users', {
    id: serial('id').primaryKey(),
    userEmail: varchar('user_email'),
    userName: varchar('user_name'),
    userImage: varchar('user_image'),
    credit: integer('credit').default(3),
});
