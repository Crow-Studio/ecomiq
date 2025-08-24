import { SubscriptionPlanEnum } from "~/lib/db/schema";

export interface QuoteFragment {
  _id: string;
  author: {
    _id: string;
    _title: string;
    image: {
      url: string;
      alt: string;
    };
    company: {
      _title: string;
      image: {
        url: string;
        alt: string;
      };
    };
    role: string;
  };
  quote: string;
}

export interface AuthFormData {
  email: string;
  password: string;
}

export interface AuthForgotPasswordFormData {
  email: string;
  new_password: string;
}


export interface PricingPlan {
  name: SubscriptionPlanEnum,
  monthlyPrice: number
  description: string
}
