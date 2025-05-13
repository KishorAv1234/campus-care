"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqs = [
  {
    question: "Is campus.care free for students?",
    answer:
      "Yes, campus.care offers a free basic plan for all students. We also offer premium plans with additional features for a small monthly fee.",
  },
  {
    question: "How do I connect my university calendar?",
    answer:
      "You can connect your university calendar by going to the Calendar Integration section in your dashboard settings. We support Google Calendar, Outlook, and most university calendar systems.",
  },
  {
    question: "Can I sell my notes on the marketplace?",
    answer:
      "You can upload and sell your notes, study guides, and other academic materials on our marketplace. You set your own prices and earn money when other students purchase your materials.",
  },
  {
    question: "How does the AI assistant work?",
    answer:
      "Our AI assistant uses advanced natural language processing to help you with your studies. It can explain concepts, summarize notes, create study plans, and generate practice questions based on your course materials.",
  },
  {
    question: "Is my data secure on campus.care?",
    answer:
      "Yes, we take data security very seriously. All your data is encrypted and stored securely. We never share your personal information with third parties without your consent.",
  },
]

export function FaqSection() {
  const [openItem, setOpenItem] = useState<string | null>(null)

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Find answers to common questions about campus.care.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <AccordionItem value={`item-${index}`}>
                  <AccordionTrigger className="text-lg font-medium py-4">{faq.question}</AccordionTrigger>
                  <AccordionContent className="text-base text-muted-foreground">{faq.answer}</AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
