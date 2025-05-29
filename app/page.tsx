"use client"

import { useState, useEffect } from "react"
import { Zap, Shield, Globe, Users, Rocket, Brain } from "lucide-react"

function DockerHubHDIPage() {
  const [activeDemo, setActiveDemo] = useState("search")
  const [typedText, setTypedText] = useState("")
  const [isTyping, setIsTyping] = useState(true)
  
  const [pullCount, setPullCount] = useState({ value: 2453789, increment: 0 })
  const [activeUsers, setActiveUsers] = useState({ value: 12467, increment: 0 })
  const [deployments, setDeployments] = useState({ value: 34521, increment: 0 })
  const [notifications, setNotifications] = useState([])
  const [popularImages, setPopularImages] = useState([
    {
      name: "nginx-hdi",
      description: "Web server with HDI auto-optimization",
      pulls: "12.4M",
      stars: 4328,
      verified: true,
      tags: ["official", "web", "latest"],
      activity: 92,
    },
    {
      name: "python-ai",
      description: "Python with HDI AI libraries pre-installed",
      pulls: "8.7M",
      stars: 3156,
      verified: true,
      tags: ["ml", "data-science", "3.11"],
      activity: 87,
    },
    {
      name: "node-hdi-dev",
      description: "Node.js optimized for HDI development",
      pulls: "10.2M",
      stars: 2987,
      verified: true,
      tags: ["javascript", "typescript", "18-alpine"],
      activity: 95,
    },
    {
      name: "postgres-hdi",
      description: "PostgreSQL with HDI auto-tuning",
      pulls: "7.8M",
      stars: 2145,
      verified: true,
      tags: ["database", "15", "persistent"],
      activity: 78,
    },
    {
      name: "redis-hdi-cache",
      description: "Redis optimized for caching with HDI",
      pulls: "6.5M",
      stars: 1876,
      verified: true,
      tags: ["cache", "memory", "7-alpine"],
      activity: 83,
    },
    {
      name: "golang-hdi",
      description: "Go with HDI performance enhancements",
      pulls: "5.9M",
      stars: 1654,
      verified: true,
      tags: ["go", "1.20", "alpine"],
      activity: 76,
    },
  ])

  useEffect(() => {
    const activityInterval = setInterval(() => {
      const pullIncrement = Math.floor(Math.random() * 10) + 1
      const userIncrement = Math.floor(Math.random() * 5) + 1
      const deployIncrement = Math.floor(Math.random() * 3) + 1
      
      setPullCount(prev => ({ 
        value: prev.value + pullIncrement, 
        increment: pullIncrement 
      }))
      
      setActiveUsers(prev => ({ 
        value: prev.value + userIncrement, 
        increment: userIncrement 
      }))
      
      setDeployments(prev => ({ 
        value: prev.value + deployIncrement, 
        increment: deployIncrement 
      }))
      
      if (Math.random() > 0.7) {
        const actions = ["pulled", "starred", "deployed", "forked"]
        const users = ["alex89", "devops_pro", "container_ninja", "docker_fan", "cloud_architect"]
        const images = popularImages.map(img => img.name)
        
        const newNotification = {
          id: Date.now(),
          user: users[Math.floor(Math.random() * users.length)],
          action: actions[Math.floor(Math.random() * actions.length)],
          image: images[Math.floor(Math.random() * images.length)],
          time: "just now"
        }
        
        setNotifications(prev => [newNotification, ...prev.slice(0, 4)])
      }
      
      setPopularImages(prev => 
        prev.map(img => ({
          ...img,
          activity: Math.max(50, Math.min(99, img.activity + (Math.random() > 0.5 ? 1 : -1) * Math.floor(Math.random() * 5)))
        }))
      )
    }, 3000)
    
    return () => clearInterval(activityInterval)
  }, [])

  const fullText = "docker run -it --rm ubuntu:latest bash"

  useEffect(() => {
    if (isTyping && typedText.length < fullText.length) {
      const timer = setTimeout(() => {
        setTypedText(fullText.slice(0, typedText.length + 1))
      }, 100)
      return () => clearTimeout(timer)
    } else if (typedText.length === fullText.length) {
      setTimeout(() => {
        setIsTyping(false)
        setTimeout(() => {
          setTypedText("")
          setIsTyping(true)
        }, 2000)
      }, 1000)
    }
  }, [typedText, isTyping, fullText])

  const features = [
    {
      icon: Brain,
      title: "AI-Powered Discovery",
      description: "Find the perfect container with natural language search powered by HDI intelligence.",
    },
    {
      icon: Zap,
      title: "Instant Deployment",
      description: "Deploy containers with a single click. HDI handles configuration and optimization automatically.",
    },
    {
      icon: Shield,
      title: "Security First",
      description: "Built-in vulnerability scanning and compliance checks for every image in the registry.",
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description: "Share, review, and manage container images with your team using advanced workflow tools.",
    },
    {
      icon: Rocket,
      title: "Performance Optimized",
      description: "HDI automatically optimizes container performance based on usage patterns and requirements.",
    },
    {
      icon: Globe,
      title: "Global Distribution",
      description: "Access your containers from anywhere with our worldwide content delivery network.",
    },
  ]

  const stats = [
    { value: "50M+", label: "Container Pulls Daily" },
    { value: "2M+", label: "Developers" },
    { value: "100K+", label: "Organizations" },
    { value: "99.9%", label: "Uptime SLA" },
  ]

  const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
