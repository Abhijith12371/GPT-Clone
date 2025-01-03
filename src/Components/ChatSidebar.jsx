import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import ChatIcon from '@mui/icons-material/Chat';
import { useNavigate } from 'react-router-dom';
import { setDoc, doc, getDocs, collection } from 'firebase/firestore';
import { auth, db } from '../../firebaseconfig';

// Styled components
const SidebarContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  maxWidth: '300px',
  height: '100vh',
  backgroundColor: theme.palette.background.paper,
  borderRight: `1px solid ${theme.palette.divider}`,
  display: 'flex',
  flexDirection: 'column',
  [theme.breakpoints.down('sm')]: {
    maxWidth: '100px', // Compact view on smaller screens
  },
}));

const Header = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  borderBottom: `1px solid ${theme.palette.divider}`,
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
}));

const CreateChatButton = styled(IconButton)(({ theme }) => ({
  margin: theme.spacing(1),
  color: theme.palette.primary.main,
  alignSelf: 'center',
  [theme.breakpoints.down('sm')]: {
    margin: theme.spacing(0.5), // Smaller margin for compact view
  },
}));

const ChatListContainer = styled(Box)(({ theme }) => ({
  overflowY: 'auto',
  flex: 1,
  padding: theme.spacing(1),
}));

const ListItemTextWrapper = styled(ListItemText)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    '.MuiListItemText-primary': {
      fontSize: '0.8rem', // Smaller text on compact view
    },
  },
}));

export default function ChatSidebar() {
  const navigate = useNavigate();
  const userId = auth.currentUser?.uid;
  const [chatHistory, setChatHistory] = useState([]);

  // Function to fetch chat history from Firestore
  const fetchChatHistory = async () => {
    if (!userId) return;

    try {
      const chatRef = collection(db, 'users', userId, 'chats');
      const querySnapshot = await getDocs(chatRef);
      const chats = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setChatHistory(chats);
    } catch (error) {
      console.error('Error fetching chat history:', error);
    }
  };

  // Fetch chat history on mount
  useEffect(() => {
    fetchChatHistory();
  }, [userId]);

  // Function to create a new chat
  const handleNewChat = async () => {
    if (!userId) {
      console.error('User is not authenticated.');
      return;
    }

    try {
      const newChatId = `chat_${Date.now()}`;
      const newChatRef = doc(db, 'users', userId, 'chats', newChatId);

      // Create an empty chat in Firestore
      await setDoc(newChatRef, { createdAt: new Date(), messages: [] });

      // Fetch updated chat history and redirect
      await fetchChatHistory();
      navigate(`/chat/${newChatId}`);
    } catch (error) {
      console.error('Error creating a new chat:', error);
    }
  };

  // Redirect to specific chat
  const handleChatRedirect = (chatId) => {
    navigate(`/chat/${chatId}`);
  };

  return (
    <SidebarContainer>
      <Header>
        <Typography variant="h6" align="center">
          Chat Manager
        </Typography>
      </Header>
      <CreateChatButton onClick={handleNewChat}>
        <AddIcon />
      </CreateChatButton>
      <Typography variant="body2" align="center" gutterBottom>
        Create a New Chat
      </Typography>
      <ChatListContainer>
        <List>
          {chatHistory.map((chat) => {
            // Extract the first user query or fallback to "Unnamed Chat"
            const firstMessage =
              chat.messages?.[0]?.text || 'Unnamed Chat';

            return (
              <ListItem
                button
                key={chat.id}
                onClick={() => handleChatRedirect(chat.id)}
              >
                <ListItemIcon>
                  <ChatIcon />
                </ListItemIcon>
                <ListItemTextWrapper
                  primary={firstMessage}
                  secondary={`ID: ${chat.id}`}
                />
              </ListItem>
            );
          })}
        </List>
      </ChatListContainer>
    </SidebarContainer>
  );
}
