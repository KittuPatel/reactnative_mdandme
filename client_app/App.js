import React, { useState, useEffect, useCallback } from "react"
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
} from "react-native"
import api from "./api" // Import the api instance
import { styles } from "./styles"
import Icon from "react-native-vector-icons/FontAwesome"

const App = () => {
  const [posts, setPosts] = useState([])
  const [selectedPost, setSelectedPost] = useState(null)
  const [newComment, setNewComment] = useState("")
  const [expandedPost, setExpandedPost] = useState(null)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    loadPosts()
  }, [])

  const loadPosts = useCallback(async () => {
    if (loading) return
    setLoading(true)
    try {
      const response = await api.get(`/posts?_page=${page}&_limit=10`) // Use api.get instead of axios.get
      setPosts((prevPosts) => [...prevPosts, ...response.data])
      setPage((prevPage) => prevPage + 1)
    } catch (error) {
      console.error(error)
    }
    setLoading(false)
  }, [loading, page])

  const handleHug = useCallback((postUrl) => {
    api
      .post("/hug", { postUrl }) // Use api.post instead of axios.post
      .then((response) => {
        if (response.data.success) {
          setPosts((prevPosts) =>
            prevPosts.map((post) =>
              post.post_url === postUrl
                ? { ...post, num_hugs: post.num_hugs + 1 }
                : post
            )
          )
        }
      })
      .catch((error) => console.error(error))
  }, [])

  const handleComment = useCallback(
    (postUrl) => {
      api
        .post("/comment", {
          postUrl,
          comment: { display_name: "Anonymous", text: newComment },
        })
        .then((response) => {
          if (response.data.success) {
            setPosts((prevPosts) =>
              prevPosts.map((post) =>
                post.post_url === postUrl
                  ? {
                      ...post,
                      comments: {
                        [Date.now()]: {
                          id: Date.now(),
                          display_name: "Anonymous",
                          text: newComment,
                          created_at: new Date().toISOString(),
                        },
                        ...post.comments,
                      },
                    }
                  : post
              )
            )
            setNewComment("")
          }
        })
        .catch((error) => console.error(error))
    },
    [newComment]
  )

  const renderComment = useCallback(
    (comment) => (
      <View key={comment.id} style={styles.comment}>
        <Text style={styles.commentName}>{comment.display_name}</Text>
        <Text style={styles.postBody}>{comment.text}</Text>
        <Text style={styles.commentDate}>
          {new Date(comment.created_at).toLocaleString()}
        </Text>
      </View>
    ),
    []
  )

  const renderPost = useCallback(
    ({ item }) => {
      const isExpanded = expandedPost === item.post_url
      const truncatedText = item.patient_description.slice(0, 220)
      const shouldShowReadMore = item.patient_description.length > 100

      return (
        <View style={styles.post}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.postBody}>
            {isExpanded ? item.patient_description : truncatedText}
            {shouldShowReadMore && !isExpanded && (
              <Text
                style={styles.readMore}
                onPress={() => setExpandedPost(item.post_url)}
              >
                ...Read more
              </Text>
            )}
          </Text>
          <View style={styles.actions}>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => handleHug(item.post_url)}
            >
              <Icon name='heart' size={20} color='#F33A6A' />
              <Text style={styles.iconText}> {item.num_hugs}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => setSelectedPost(item.post_url)}
            >
              <Icon name='comment' size={20} color='#6495ED' />
              <Text style={styles.iconText}>
                {" "}
                {Object.keys(item.comments).length}
              </Text>
            </TouchableOpacity>
          </View>
          {selectedPost === item.post_url && (
            <View>
              <ScrollView style={styles.commentSection}>
                {Object.values(item.comments).map(renderComment)}
              </ScrollView>
              <TextInput
                style={styles.input}
                value={newComment}
                onChangeText={setNewComment}
                placeholder='Add a comment...'
                onSubmitEditing={() => handleComment(item.post_url)}
              />
            </View>
          )}
        </View>
      )
    },
    [
      expandedPost,
      handleComment,
      handleHug,
      newComment,
      renderComment,
      selectedPost,
    ]
  )

  return (
    <SafeAreaView style={styles.safeArea}>
      <FlatList
        data={posts}
        renderItem={renderPost}
        keyExtractor={(item) => item.post_url}
        contentContainerStyle={styles.container}
        ListHeaderComponent={() => (
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Posts</Text>
          </View>
        )}
        onEndReached={loadPosts}
        onEndReachedThreshold={0.1}
        ListFooterComponent={
          loading ? <ActivityIndicator size='large' color='#0000ff' /> : null
        }
      />
    </SafeAreaView>
  )
}

export default App
