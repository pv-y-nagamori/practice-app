"use client";
import {
  Box,
  Drawer,
  Link,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Toolbar,
} from "@mui/material";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import LogoutIcon from '@mui/icons-material/Logout';
import CoffeeIcon from "@mui/icons-material/Coffee";
import React from "react";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import Image from 'next/image' 

type MenuItem = {
  name: string;
  url: string;
  icon: React.ReactNode;
};
const menuList: MenuItem[] = [
  { name: "ページ１", url: "/page1", icon: <BeachAccessIcon /> },
  { name: "ページ２", url: "/page2", icon: <CoffeeIcon /> },
];

const drawerWidth = 240;

const SideBar = () => {
  const pathname = usePathname();
  const isSelected = (url: string) => {
    if (pathname === url || pathname.startsWith(url + "/")) {
      return true;
    }
    return false;
  };

  const { data:session } = useSession();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
    >
      <Toolbar />
      <Box sx={{ overflow: "auto" }}>
        <List>
          {menuList.map(({ name, url, icon }: MenuItem) => (
            <ListItem key={name} disablePadding>
              <ListItemButton selected={isSelected(url)}>
                <ListItemIcon>{icon}</ListItemIcon>
                <Link href={url} underline="none" color="inherit">
                  {name}
                </Link>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
      <Box sx={{ marginTop: "auto" }}>
        <List>
          <ListItem>
                <ListItemButton>
                  <ListItemIcon><Image src={session?.user?.image ?? '/no_image.png'} alt="icon" width={18} height={18}/></ListItemIcon>
                  <Link href="#" underline="none" color="inherit">
                    {session?.user?.name}
                  </Link>
                </ListItemButton>
              </ListItem>
            <ListItem>
            <ListItemButton>
              <ListItemIcon><LogoutIcon /></ListItemIcon>
              <Link onClick={()=>{signOut()}} underline="none" color="inherit">
              logout
              </Link>
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
      
    </Drawer>
  );
};

export default SideBar;