"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CreditCardIcon, SmartphoneIcon } from 'lucide-react';

export function PaymentMethods() {
  const [paymentMethod, setPaymentMethod] = useState("card");

  return (
    <div className="bg-muted/50 rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-6">Payment Methods</h2>
      <div className="space-y-6">
        <RadioGroup
          value={paymentMethod}
          onValueChange={setPaymentMethod}
          className="space-y-4"
        >
          <div className="flex items-center space-x-2 border rounded-lg p-4">
            <RadioGroupItem value="card" id="card" />
            <Label htmlFor="card" className="flex items-center">
              <CreditCardIcon className="h-5 w-5 mr-2" />
              Credit/Debit Card
            </Label>
          </div>
          <div className="flex items-center space-x-2 border rounded-lg p-4">
            <RadioGroupItem value="upi" id="upi" />
            <Label htmlFor="upi" className="flex items-center">
              <SmartphoneIcon className="h-5 w-5 mr-2" />
              UPI Payment
            </Label>
          </div>
        </RadioGroup>

        {paymentMethod === "card" && (
          <div className="space-y-4 border rounded-lg p-4">
            <div>
              <Label htmlFor="card-number">Card Number</Label>
              <Input
                id="card-number"
                placeholder="1234 5678 9012 3456"
                maxLength={19}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="expiry">Expiry Date</Label>
                <Input id="expiry" placeholder="MM/YY" maxLength={5} />
              </div>
              <div>
                <Label htmlFor="cvv">CVV</Label>
                <Input id="cvv" placeholder="123" maxLength={3} />
              </div>
            </div>
            <div>
              <Label htmlFor="name">Name on Card</Label>
              <Input id="name" placeholder="John Doe" />
            </div>
          </div>
        )}

        {paymentMethod === "upi" && (
          <div className="space-y-4 border rounded-lg p-4">
            <div>
              <Label htmlFor="upi-id">UPI ID</Label>
              <Input id="upi-id" placeholder="yourname@upi" />
            </div>
            <div className="text-sm text-muted-foreground">
              <p>
                You will receive a payment request on your UPI app when you make
                a purchase.
              </p>
            </div>
          </div>
        )}

        <div className="flex justify-between items-center border-t pt-4">
          <div>
            <h3 className="font-medium">Saved Payment Methods</h3>
            <p className="text-sm text-muted-foreground">
              You have no saved payment methods
            </p>
          </div>
          <Button variant="outline">Add New</Button>
        </div>
      </div>
    </div>
  );
}
