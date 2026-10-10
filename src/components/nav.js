"use client";

import { Box, Collapsible, Flex, IconButton, Link, Stack } from "@chakra-ui/react";
import { BsListNested, BsXLg } from "react-icons/bs";
import Image from "next/image";
import { useRef, useState } from "react";
import { navigateToSection } from './landing/anchor-navigation';

const items = [
  ["About Us", "/#about"], ["Why Dev Club", "/#why-us"],
  ["Teams", "/#teams"], ["FAQ", "/#faqs"],
];
const action = { bg: "club.ink", color: "white", border: "2px solid", borderColor: "club.ink", px: 6, py: 3, rounded: "square", _hover: { bg: "white", color: "black" } };

export default function Navigation() {
  const [open, setOpen] = useState(false);
  const trigger = useRef(null);
  function close() { setOpen(false); }
  function section(event, href) {
    close();
    if (location.pathname !== '/' || event.button !== 0 || event.metaKey || event.ctrlKey || event.altKey || event.shiftKey) return;
    event.preventDefault();
    requestAnimationFrame(() => void navigateToSection(href.split('#')[1]));
  }
  function escape(event) {
    if (event.key === "Escape" && open) { close(); trigger.current?.focus(); }
  }
  return (
    <Box as="nav" aria-label="Main navigation" position="sticky" top="0" zIndex="20" bg="bg" color="fg" onKeyDown={escape} borderBottomWidth="1px" borderColor="border">
      <Collapsible.Root ids={{ content: "mobile-navigation" }} open={open} onOpenChange={event => setOpen(event.open)}>
        <Flex h="80px" align="center" justify="space-between" px={{ base: 6, xl: 12 }} gap="6">
          <Link href="/" aria-label="Dev Club home" flexShrink="0" onClick={close}>
            <Image width={60} height={60} src="/logo_k.svg" alt="Dev Club" />
          </Link>
          <Flex align="center" gap={{ base: 6, xl: 8 }} display={{ base: "none", lg: "flex" }}>
            <Stack direction="row" gap={{ base: 4, xl: 8 }} align="center">
              {items.map(([label, href]) => <Link key={href} href={href} onClick={event => section(event, href)} minH="44px" px="2" fontSize="lg" color="fg" _hover={{ textDecoration: "underline", fontStyle: "italic" }}>{label}</Link>)}
            </Stack>
            <Link href="/recruit" {...action}>Joining information</Link>
          </Flex>
          <IconButton ref={trigger} onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="mobile-navigation" display={{ base: "flex", lg: "none" }} aria-label="Toggle Navigation" variant="ghost" color="fg" size="lg" rounded="square">
            {open ? <BsXLg /> : <BsListNested />}
          </IconButton>
        </Flex>
        <Collapsible.Content position="absolute" top="100%" left="0" w="full" boxShadow="sm">
          <Stack display={{ base: "flex", lg: "none" }} px="6" py="4" gap="2" bg="bg">
            {items.map(([label, href]) => <Link key={href} href={href} minH="44px" fontSize="lg" onClick={event => section(event, href)}>{label}</Link>)}
            <Link href="/recruit" onClick={close} {...action}>Joining information</Link>
          </Stack>
        </Collapsible.Content>
      </Collapsible.Root>
    </Box>
  );
}
