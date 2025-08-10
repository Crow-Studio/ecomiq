import { useState } from "react";
import { Heading } from "~/common/heading";
import { Section } from "~/common/section-wrapper";
import { QuoteFragment } from "~/types";
import { Slider } from "./slider";

export function TestimonialsGrid() {
  const [quotes] = useState<QuoteFragment[]>([
    {
      _id: "1",
      author: {
        _id: "a1",
        _title: "Samantha Lee",
        image: {
          alt: "Samantha Lee",
          url: "https://api.dicebear.com/7.x/avataaars/svg?seed=SamanthaLee",
        },
        company: {
          _title: "Urban Threads",
          image: {
            alt: "Urban Threads",
            url: "https://api.dicebear.com/7.x/shapes/svg?seed=UrbanThreads",
          },
        },
        role: "Founder",
      },
      quote:
        "Ecomiq completely transformed how we run our store. From inventory tracking to automated shipping, everything works smoothly. I finally have time to focus on product quality and customer experience.",
    },
    {
      _id: "2",
      author: {
        _id: "a2",
        _title: "David Kim",
        image: {
          alt: "David Kim",
          url: "https://api.dicebear.com/7.x/avataaars/svg?seed=DavidKim",
        },
        company: {
          _title: "TechHive Gadgets",
          image: {
            alt: "TechHive Gadgets",
            url: "https://api.dicebear.com/7.x/shapes/svg?seed=TechHiveGadgets",
          },
        },
        role: "Operations Manager",
      },
      quote:
        "With Ecomiq, our order processing is twice as fast. The analytics dashboard gives us real-time insights into sales and inventory, so we can make decisions without guessing.",
    },
    {
      _id: "3",
      author: {
        _id: "a3",
        _title: "Aisha Mwangi",
        image: {
          alt: "Aisha Mwangi",
          url: "https://api.dicebear.com/7.x/avataaars/svg?seed=AishaMwangi",
        },
        company: {
          _title: "Safari Styles",
          image: {
            alt: "Safari Styles",
            url: "https://api.dicebear.com/7.x/shapes/svg?seed=SafariStyles",
          },
        },
        role: "E-commerce Lead",
      },
      quote:
        "Switching to Ecomiq was the best move we made. The built-in email marketing and abandoned cart recovery have boosted our revenue without adding extra work for our team.",
    },
    {
      _id: "4",
      author: {
        _id: "a4",
        _title: "Lucas Fernandez",
        image: {
          alt: "Lucas Fernandez",
          url: "https://api.dicebear.com/7.x/avataaars/svg?seed=LucasFernandez",
        },
        company: {
          _title: "FreshBrew Co.",
          image: {
            alt: "FreshBrew Co.",
            url: "https://api.dicebear.com/7.x/shapes/svg?seed=FreshBrewCo",
          },
        },
        role: "Owner",
      },
      quote:
        "Managing orders used to take hours each day. With Ecomiq, it’s all automated, and I can track shipping without leaving the dashboard.",
    },
    {
      _id: "5",
      author: {
        _id: "a5",
        _title: "Maria Gonzalez",
        image: {
          alt: "Maria Gonzalez",
          url: "https://api.dicebear.com/7.x/avataaars/svg?seed=MariaGonzalez",
        },
        company: {
          _title: "Bliss Cosmetics",
          image: {
            alt: "Bliss Cosmetics",
            url: "https://api.dicebear.com/7.x/shapes/svg?seed=BlissCosmetics",
          },
        },
        role: "CEO",
      },
      quote:
        "Ecomiq’s inventory alerts saved us from multiple stockout situations. The platform practically pays for itself.",
    },
    {
      _id: "6",
      author: {
        _id: "a6",
        _title: "Omar Khalid",
        image: {
          alt: "Omar Khalid",
          url: "https://api.dicebear.com/7.x/avataaars/svg?seed=OmarKhalid",
        },
        company: {
          _title: "SpiceRoute Foods",
          image: {
            alt: "SpiceRoute Foods",
            url: "https://api.dicebear.com/7.x/shapes/svg?seed=SpiceRouteFoods",
          },
        },
        role: "Supply Chain Manager",
      },
      quote:
        "I love how Ecomiq integrates payment gateways without extra setup headaches. Customers check out smoothly every time.",
    },
    {
      _id: "7",
      author: {
        _id: "a7",
        _title: "Chloe Turner",
        image: {
          alt: "Chloe Turner",
          url: "https://api.dicebear.com/7.x/avataaars/svg?seed=ChloeTurner",
        },
        company: {
          _title: "EcoBloom",
          image: {
            alt: "EcoBloom",
            url: "https://api.dicebear.com/7.x/shapes/svg?seed=EcoBloom",
          },
        },
        role: "Founder",
      },
      quote:
        "We reduced cart abandonment by 25% thanks to Ecomiq’s automated follow-up emails. It’s like having a marketing team on autopilot.",
    },
    {
      _id: "8",
      author: {
        _id: "a8",
        _title: "James O’Connor",
        image: {
          alt: "James O’Connor",
          url: "https://api.dicebear.com/7.x/avataaars/svg?seed=JamesOConnor",
        },
        company: {
          _title: "CraftedHome",
          image: {
            alt: "CraftedHome",
            url: "https://api.dicebear.com/7.x/shapes/svg?seed=CraftedHome",
          },
        },
        role: "Sales Director",
      },
      quote:
        "The sales reports are so clear that even our non-technical staff can spot trends and make better product decisions.",
    },
    {
      _id: "9",
      author: {
        _id: "a9",
        _title: "Fatima Noor",
        image: {
          alt: "Fatima Noor",
          url: "https://api.dicebear.com/7.x/avataaars/svg?seed=FatimaNoor",
        },
        company: {
          _title: "Luxe Linens",
          image: {
            alt: "Luxe Linens",
            url: "https://api.dicebear.com/7.x/shapes/svg?seed=LuxeLinens",
          },
        },
        role: "Marketing Lead",
      },
      quote:
        "We’ve tried other platforms, but Ecomiq’s balance of simplicity and powerful features is unmatched.",
    },
    {
      _id: "10",
      author: {
        _id: "a10",
        _title: "Ethan Brooks",
        image: {
          alt: "Ethan Brooks",
          url: "https://api.dicebear.com/7.x/avataaars/svg?seed=EthanBrooks",
        },
        company: {
          _title: "Peak Outdoors",
          image: {
            alt: "Peak Outdoors",
            url: "https://api.dicebear.com/7.x/shapes/svg?seed=PeakOutdoors",
          },
        },
        role: "Co-Founder",
      },
      quote:
        "Ecomiq gives us a complete view of our operations in one place. No more juggling spreadsheets and separate tools.",
    },
  ]);

  return (
    <div className="relative overflow-clip">
      <Section>
        <Slider quotes={quotes}>
          <Heading className="self-stretch">
            <h4>What our clients say</h4>
          </Heading>
        </Slider>
      </Section>
    </div>
  );
}
