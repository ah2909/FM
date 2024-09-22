"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"

export default function AddAccountForm({ onClose }: { onClose: () => void }) {

  const addAccount = async (formData: FormData) => {
    console.log(formData)
    onClose()
  }

  return (
    <form action={addAccount}>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="account_number">Account Number</Label>
            <Input id="account_number" name="account_number" placeholder="Enter account number" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="account_holder_name">Account Holder Name</Label>
            <Input id="account_holder_name" name="account_holder_name" placeholder="Enter account holder name" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="identification_number">Identification Number</Label>
            <Input id="identification_number" name="identification_number" placeholder="Enter identification number" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone_number">Phone Number</Label>
            <Input id="phone_number" name="phone_number" placeholder="Enter phone number" required />
          </div>
        </div>
        <div className="flex justify-end space-x-2 mt-6">
          <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
          <Button type="submit">Add Account</Button>
        </div>
      </form>
  )
}