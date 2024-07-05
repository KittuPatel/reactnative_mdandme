const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const fs = require("fs")

const app = express()
const port = 3000

app.use(bodyParser.json())
app.use(cors())

// Load mock data
let data = JSON.parse(fs.readFileSync("data.json", "utf8"))

// Hit Test
app.get("/", (req, res) => {
  res.send("Backend is up and running!")
})

// Utility function to paginate the data
const paginate = (array, page, limit) => {
  return array.slice((page - 1) * limit, page * limit)
}

// GET Request to send paginated posts
app.get("/posts", (req, res) => {
  const page = parseInt(req.query._page) || 1
  const limit = parseInt(req.query._limit) || 10

  const paginatedData = paginate(data, page, limit)
  res.json(paginatedData)
})

// POST Request to increment hugs for a given post url.
app.post("/hug", (req, res) => {
  const { postUrl } = req.body
  const post = data.find((p) => p.post_url === postUrl)
  if (post) {
    post.num_hugs += 1
    fs.writeFileSync("data.json", JSON.stringify(data, null, 2))
    res.json({ success: true })
  } else {
    res.status(404).json({ error: "Post not found" })
  }
})

// POST Request to add a comment to a post.
app.post("/comment", (req, res) => {
  const { postUrl, comment } = req.body
  const post = data.find((p) => p.post_url === postUrl)
  if (post) {
    const newCommentId = Math.max(...Object.keys(post.comments).map(Number)) + 1
    post.comments[newCommentId] = {
      id: newCommentId,
      parent_id: null,
      display_name: comment.display_name,
      text: comment.text,
      created_at: new Date().toISOString(),
    }
    fs.writeFileSync("data.json", JSON.stringify(data, null, 2))
    res.json({ success: true })
  } else {
    res.status(404).json({ error: "Post not found" })
  }
})

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})
