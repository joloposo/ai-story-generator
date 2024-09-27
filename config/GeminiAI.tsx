const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require('@google/generative-ai');

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: 'gemini-1.5-flash',
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: 'application/json',
};

export const chatSession = model.startChat({
  generationConfig,
  // safetySettings: Adjust safety settings
  // See https://ai.google.dev/gemini-api/docs/safety-settings
  history: [
    {
      role: "user",
      parts: [
        {text: "Create kids story on description for 5-8 Years kids, Educational story, and all images in Paper cut styte: Story of boy and Magic School, give me 5 chapters, with detailed image text prompt for each of chapter and image prompt for story cover book with story name, all in valid JSON field format."},
      ],
    },
    {
      role: "model",
      parts: [
        {text: "```json\n{\n  \"story\": {\n    \"title\": \"The Boy Who Went to Magic School\",\n    \"cover\": {\n      \"image_prompt\": \"Paper cut illustration of a boy with a mischievous grin, wearing a pointed wizard hat, standing in front of a magnificent castle with swirling purple and green windows. The castle is surrounded by floating books and magical creatures. The background is a starry night sky with a crescent moon.\"\n    },\n    \"chapters\": [\n      {\n        \"title\": \"The Mysterious Invitation\",\n        \"text\": \"Leo was a curious boy, always on the lookout for adventure. One day, a peculiar envelope arrived at his doorstep. It was addressed to him, in swirling purple ink, with a wax seal featuring a tiny, shimmering star. Inside, he found a handwritten note: 'Dear Leo, You have been chosen to attend the Academy of Magical Arts. Please arrive at midnight on the full moon.' Leo's heart pounded with excitement and a touch of fear. Could it be true? Could he really go to magic school?\",\n        \"image_prompt\": \"Paper cut illustration of Leo holding the mysterious invitation with a surprised expression. His room is filled with books and toys, with a crescent moon peeking through the window. The envelope is glowing slightly, with tiny purple sparkles around it.\"\n      },\n      {\n        \"title\": \"Journey to the Magical Academy\",\n        \"text\": \"Leo's journey to the Academy was unlike any he had ever experienced. He climbed aboard a giant, fluffy cloud, pulled by a team of mischievous fireflies. The journey was filled with wonder - they flew past sparkling constellations, dodged mischievous shooting stars, and even had a friendly chat with a talking moonbeam. Finally, they arrived at the Academy, a majestic castle perched atop a mountain, with swirling purple and green windows and a magnificent, shimmering gate.\",\n        \"image_prompt\": \"Paper cut illustration of Leo riding a cloud pulled by fireflies. They are flying through a night sky filled with twinkling stars, constellations, and shooting stars. In the distance, the magical academy is visible, with its majestic tower and glowing windows.\"\n      },\n      {\n        \"title\": \"First Day at Magic School\",\n        \"text\": \"Leo's first day at the Academy was full of excitement and challenges. He learned to make his wand glow with vibrant colours, conjure shimmering bubbles that danced in the air, and even turned his shoes into magical slippers that could fly. His classmates were a diverse bunch - a shy unicorn, a mischievous goblin, and a friendly talking dragon. Together, they learned the art of magic in a fun and playful way.\",\n        \"image_prompt\": \"Paper cut illustration of Leo standing inside a classroom at the academy, surrounded by his magical classmates - a unicorn, goblin, and a dragon. They are all learning from a wise wizard with a long, flowing beard and a sparkling wand.\"\n      },\n      {\n        \"title\": \"The Magic Challenge\",\n        \"text\": \"The annual Magic Challenge was approaching, and Leo was eager to participate. He had to learn a powerful spell, but it proved to be tricky. He practiced tirelessly, but something was missing. One night, he had a dream about a lost magical creature. The next day, he found the creature, a tiny, glowing pixie, hiding in the academy's gardens. He helped the pixie find its way home, and as a reward, he learned a powerful spell of kindness and compassion.\",\n        \"image_prompt\": \"Paper cut illustration of Leo practicing a magic spell in the academy gardens. He is struggling with the spell, and his wand is emitting sparks. A tiny glowing pixie is flying around him, offering encouragement. The background shows the academy castle with its magical windows.\"\n      },\n      {\n        \"title\": \"The Magical Victory\",\n        \"text\": \"On the day of the Magic Challenge, Leo stood confidently before the judges. He cast his spell of kindness and compassion, and it filled the entire academy with a warm glow. The judges were amazed by his magical talent and his kind heart. Leo had won the Magic Challenge, proving that true magic comes from within. From that day on, Leo knew that he was not just a student, but a true magician, with a bright future ahead of him.\",\n        \"image_prompt\": \"Paper cut illustration of Leo standing on a stage at the academy, casting his spell of kindness and compassion. The entire academy is glowing with warmth, and the judges are amazed by his magic. Leo is smiling with pride and happiness.\"\n      }\n    ]\n  }\n}\n```"},
      ],
    },
  ],
});
