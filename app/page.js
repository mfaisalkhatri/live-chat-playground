"use client";

import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import styles from "./styles/Chat.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLinkedin,
  faGithub,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import Image from "next/image"; 

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [isChatting, setIsChatting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [liveUsers, setLiveUsers] = useState([]);
  const chatEndRef = useRef(null);
  const socketRef = useRef(null);

  useEffect(() => {
    if (isChatting) {
      socketRef.current = new WebSocket("ws://localhost:3001");

      const joinMessage = {
        name: name,
        location: location,
        age: age,
        gender: gender,
        type: "join",
      };
      socketRef.current.onopen = () => {
        socketRef.current.send(JSON.stringify(joinMessage));
      };

      socketRef.current.onmessage = async (event) => {
        let message;
        if (typeof event.data === "string") {
          message = JSON.parse(event.data);
        } else {
          const text = await event.data.text();
          message = JSON.parse(text);
        }

        if (
          message.type === "join" ||
          message.type === "leave" ||
          message.type === "message"
        ) {
          setMessages((prevMessages) => [...prevMessages, message]);
        }

        if (message.type === "join" || message.type === "leave") {
          setLiveUsers(message.users);
        }
      };

      return () => socketRef.current?.close();
    }
  }, [isChatting, location, name, age, gender]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (input.trim()) {
      const message = {
        user: name,
        location: location,
        text: input,
        age: age,
        gender: gender,
        type: "message",
      };

      socketRef.current.send(JSON.stringify(message));
      setInput("");
    }
  };

  const handleStartChat = (e) => {
    e.preventDefault();

    if (age < 18 || age > 99) {
      setErrorMessage("Age should be between 18 and 99");
      return;
    }

    const locationOnlyNumbers = /^[0-9]+$/.test(location);
    if (locationOnlyNumbers) {
      setErrorMessage("Location cannot contain only numbers");
      return;
    }

    if (name.trim() && location.trim() && age.trim()) {
      setErrorMessage("");
      setIsChatting(true);
    }
  };

  const handleExitChat = () => {
    socketRef.current.close();
    setIsChatting(false);
    setMessages([]);
  };

  return (
    <div className={styles.container}>
      <nav className={styles.navbar}>
        <h1 className={styles.navTitle}>Live Chat Playground</h1>
      </nav>

      {!isChatting ? (
        <form
          id="start-chat"
          onSubmit={handleStartChat}
          className={styles.inputContainer}
        >
          <h1 className={styles.title}>Welcome to Live Chat Playground</h1>
          {errorMessage && (
            <p className={styles.errorMessage}>{errorMessage}</p>
          )}
          <input
            type="text"
            id="name"
            name="name-field"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={styles.input}
            placeholder="Enter your name"
            required
          />
          <input
            type="text"
            id="location"
            name="location-field"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className={styles.input}
            placeholder="Enter your location"
            required
          />
          <input
            type="text"
            id="age"
            name="age-field"
            value={age}
            onChange={(e) => {
              const value = e.target.value;
              if (/^\d*$/.test(value)) {
                setAge(value);
              }
            }}
            className={styles.input}
            placeholder="Enter your age"
            required
          />
          <select
            id="chat-room"
            name="chatroom"
            className={styles.select}
            required
          >
            <option value="">-- Select Chat Room --</option>
            <option value="General">General</option>
            <option value="Meme Bank">Meme Bank</option>
            <option value="Friends">Friends</option>
          </select>
          <fieldset className={styles.radioGroup}>
            <label>
              <input
                type="radio"
                id="male"
                name="gender"
                value="M"
                onChange={(e) => setGender(e.target.value)}
                required
              />{" "}
              Male
            </label>
            <label>
              <input
                type="radio"
                id="female"
                name="gender"
                value="F"
                onChange={(e) => setGender(e.target.value)}
                required
              />{" "}
              Female
            </label>
          </fieldset>
          <div className={styles.checkbox}>
            <input
              type="checkbox"
              id="terms"
              name="terms"
              required
              aria-describedby="terms-description"
            />
            I agree to the Terms and Conditions
          </div>
          <button type="submit" className={styles.sendButton} id="start-chat">
            Start Chatting
          </button>
        </form>
      ) : (
        <div className={styles.chatBoxContainer}>
          <div className={styles.chatBox}>
            <div className={styles.messages}>
              {messages.map((msg, index) => (
                <div
                  key={index}
                  id={`message-${index}`}
                  className={
                    msg.user === name ? styles.bubbleRight : styles.bubbleLeft
                  }
                >
                  <strong>
                    {msg.user} {msg.location && `(${msg.location})`}:
                  </strong>{" "}
                  {msg.text}
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>
            <form
              id="chat-container-form"
              onSubmit={sendMessage}
              className={styles.chatBoxContainer}
            >
              <input
                type="text"
                id="message"
                name="send-message"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className={styles.input}
                placeholder="Type your message here..."
                required
              />
              <button
                type="submit"
                className={styles.sendButton}
                id="send-message"
              >
                Send
              </button>
            </form>
            <button
              onClick={handleExitChat}
              className={styles.exitButton}
              id="logout"
            >
              Logout
            </button>
          </div>
          <div className={styles.liveUsersList}>
            <h3>Live Users List ({liveUsers.length})</h3>
            <ul>
              {liveUsers.map((user, index) => {
                return (
                  <li key={index}>
                    <strong>{user.name}</strong> {user.age} {user.gender}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}
      <footer className={styles.footer}>
        <p>© 2025 Live Chat App is designed and built by Faisal Khatri</p>
        <div className={styles.socialLinks}>
          <a
            href="https://www.linkedin.com/in/faisalkhatri"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faLinkedin} size="2x" />
          </a>
          <a
            href="https://github.com/mfaisalkhatri/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faGithub} size="2x" />
          </a>
          <a
            href="https://www.youtube.com/@faisalkhatriqa"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faYoutube} size="2x" />
          </a>
        </div>
      </footer>
    </div>
  );
}
