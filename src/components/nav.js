"use client";

import { Box, Collapsible, Flex, HStack, IconButton, Link, Stack } from "@chakra-ui/react";
import { BsListNested, BsXLg } from "react-icons/bs";
import Image from "next/image";
import { useState } from "react";

export default function WithSubnavigation() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Box id="about" className="z-20 top-0 sticky" bg="bg" color="fg">
      <Flex className="w-screen h-20" align="center" justify="space-between">
        <Link href="/" className="nav-items item-center">
          <Image width={84} height={84} src="/logo_k.svg" className="pl-6 pt-2" alt="Dev Club" />
        </Link>
        <Stack direction="row" gap={{ base: "0.5", lg: "7" }} alignItems="center" className="hidden md:flex mr-4">
          {NAV_ITEMS.map(item => (
            <Box key={item.label} style={{ padding: "15px" }}>
              <Link p={2} href={item.href} fontSize="lg" fontWeight={400} color="fg"
                className="transition-colors hover:italic hover:underline">{item.label}</Link>
            </Box>
          ))}
        </Stack>
        <HStack>
          <Link href="/recruit" className="px-8 py-4 flex items-center gap-3 nav-items bg-club-ink text-white hover:text-black hover:bg-white hover:border-2 hover:border-black mr-6 hover:italic">
            Schedule the Interview
          </Link>
          <IconButton className="md:hidden mr-2" onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Navigation" aria-expanded={isOpen} aria-controls="mobile-navigation"
            variant="ghost" color="fg" fontSize="3xl">
            {isOpen ? <BsXLg /> : <BsListNested />}
          </IconButton>
        </HStack>
      </Flex>
      <Collapsible.Root open={isOpen}>
        <Collapsible.Content id="mobile-navigation">
          <Stack bg="bg" color="fg" className="h-screen p-4" display={{ md: "none" }}>
            {NAV_ITEMS.map(item => (
              <Link key={item.label} py={2} href={item.href} fontWeight={500} fontSize="2xl">{item.label}</Link>
            ))}
          </Stack>
        </Collapsible.Content>
      </Collapsible.Root>
    </Box>
  );
}

const NAV_ITEMS = [
  { label: "Newsroom", href: "/" },
  { label: "Work", href: "/" },
  { label: "About", href: "/" },
  { label: "Team", href: "/" },
];
