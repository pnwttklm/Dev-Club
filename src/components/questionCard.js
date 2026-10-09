"use client";

import { Accordion } from "@chakra-ui/react";
import { BsPlusCircle } from "react-icons/bs";
import { AccordionItemContent } from "./ui/accordion";

export default function QuestionCard({ value, question, answer }) {
  return (
    <Accordion.Item value={value}>
      <h3>
        <Accordion.ItemTrigger py={5} color="fg" fontWeight="medium" fontSize={{ base: "md", sm: "xl", md: "2xl" }}>
          <span className="flex-1 text-left">{question}</span>
          <Accordion.ItemIndicator rotate={{ _open: "-135deg" }} fontSize={{ base: "xl", md: "3xl" }}>
            <BsPlusCircle />
          </Accordion.ItemIndicator>
        </Accordion.ItemTrigger>
      </h3>
      <AccordionItemContent pb={4} color="fg" fontSize={{ base: "md", sm: "lg", md: "xl" }}>
        {answer}
      </AccordionItemContent>
    </Accordion.Item>
  );
}
