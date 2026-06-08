import 'dotenv/config'
import express from 'express'
import Anthropic from '@anthropic-ai/sdk'

const app = express()
app.use(express.json())

const client = new Anthropic()

app.post('/api/motivate', async (req, res) => {
  const { habitName, streak } = req.body
  if (!habitName) return res.status(400).json({ error: 'habitName required' })

  try {
    const msg = await client.messages.create({
      model: 'claude-haiku-4-5',
      max_tokens: 120,
      messages: [
        {
          role: 'user',
          content: `Give a short (1-2 sentences, max 120 characters) warm motivational message for someone who just completed their "${habitName}" habit and is on a ${streak}-day streak. Be specific, upbeat, and personal. No hashtags or emojis.`,
        },
      ],
    })

    const text = msg.content[0]?.type === 'text' ? msg.content[0].text.trim() : ''
    res.json({ message: text })
  } catch (err) {
    console.error('Anthropic error:', err.message)
    res.status(500).json({ error: 'Failed to generate message' })
  }
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => console.log(`API server running on :${PORT}`))
