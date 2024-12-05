import { glob } from 'astro/loaders'
import { defineCollection, z } from 'astro:content'

const posts = defineCollection({
    loader: glob({ pattern: "**/*.md", base: "./src/data/posts" }),

    schema: z.object({
        title: z.string(),
        createdDate: z.date(),
        tags: z.array(z.string()).default([])
    })
})

export const collections = { posts }