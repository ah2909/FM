"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "./ui/use-toast"
import { addKey } from "@/lib/api"

export default function AddAPIKey({ onClose }: { onClose: () => void }) {
  const { toast } = useToast()
  const handleAddKey = async (formData: FormData) => {
    console.log(formData)
    let data = Object.fromEntries(formData)
    await addKey(data)
    .then(() => {
      toast({
        title: "Add API Key successfully",
      })
      onClose()
    })
    .catch((err) => {
      toast({
          variant: 'destructive',
          title: err,
        })
    })
  }

  return (
    <form action={handleAddKey}>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="api_key">API Key</Label>
            <Input id="api_key" name="api_key" placeholder="Enter api key" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="secret_key">Secret Key</Label>
            <Input id="secret_key" name="secret_key" placeholder="Enter secret key" required />
          </div>
        </div>
        <div className="flex justify-end space-x-2 mt-6">
          <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
          <Button type="submit">Submit</Button>
        </div>
      </form>
  )
}