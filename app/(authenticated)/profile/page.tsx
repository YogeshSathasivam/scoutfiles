"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, LogOut, Mail, Save, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/hooks/use-toast"

export default function ProfilePage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isChangingPassword, setIsChangingPassword] = useState(false)

  const handleSave = () => {
    setIsLoading(true)

    // Simulate saving
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Settings Saved",
        description: "Your settings have been updated successfully.",
      })
    }, 1000)
  }

  const handleLogout = () => {
    toast({
      title: "Logging out",
      description: "You have been successfully logged out.",
      variant: "success",
    })

    // Redirect to login page after a short delay
    setTimeout(() => {
      router.push("/login")
    }, 1000)
  }

  const handleChangePassword = () => {
    setIsChangingPassword(true)

    // Simulate password change
    setTimeout(() => {
      setIsChangingPassword(false)
      toast({
        title: "Password Updated",
        description: "Your password has been changed successfully.",
        variant: "success",
      })
    }, 1500)
  }

  return (
    <div className="py-8 pb-16 lg:pb-8">
      <div className="flex flex-col items-center mb-8">
        <div className="h-24 w-24 rounded-full bg-primary/10 flex items-center justify-center mb-4">
          <User className="h-12 w-12 text-primary" />
        </div>
        <h1 className="text-2xl font-bold">John Doe</h1>
        <p className="text-muted-foreground flex items-center mt-1">
          <Mail className="h-4 w-4 mr-1" />
          john@example.com
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Profile Settings</CardTitle>
            <CardDescription>Update your personal information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" defaultValue="John Doe" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" defaultValue="john@example.com" />
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleSave} disabled={isLoading}>
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Preferences</CardTitle>
            <CardDescription>Customize your experience</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="notifications">Email Notifications</Label>
                <p className="text-sm text-muted-foreground">Receive email notifications about your account</p>
              </div>
              <Switch id="notifications" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="auto-sync">Auto Sync</Label>
                <p className="text-sm text-muted-foreground">Automatically sync files from connected accounts</p>
              </div>
              <Switch id="auto-sync" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="default-view">Default Grid View</Label>
                <p className="text-sm text-muted-foreground">Use grid view as default for files</p>
              </div>
              <Switch id="default-view" />
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleSave} disabled={isLoading}>
              <Save className="mr-2 h-4 w-4" />
              {isLoading ? "Saving..." : "Save Preferences"}
            </Button>
          </CardFooter>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg">Change Password</CardTitle>
            <CardDescription>Update your password to keep your account secure</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="current-password">Current Password</Label>
              <div className="relative">
                <Input
                  id="current-password"
                  type={showCurrentPassword ? "text" : "password"}
                  placeholder="Enter your current password"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                >
                  {showCurrentPassword ? (
                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  )}
                  <span className="sr-only">{showCurrentPassword ? "Hide password" : "Show password"}</span>
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-password">New Password</Label>
              <div className="relative">
                <Input
                  id="new-password"
                  type={showNewPassword ? "text" : "password"}
                  placeholder="Enter your new password"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                >
                  {showNewPassword ? (
                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  )}
                  <span className="sr-only">{showNewPassword ? "Hide password" : "Show password"}</span>
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm New Password</Label>
              <div className="relative">
                <Input
                  id="confirm-password"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your new password"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  )}
                  <span className="sr-only">{showConfirmPassword ? "Hide password" : "Show password"}</span>
                </Button>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleChangePassword} disabled={isChangingPassword}>
              {isChangingPassword ? "Updating..." : "Change Password"}
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div className="mt-8 flex justify-center">
        <Button variant="destructive" size="lg" className="w-full max-w-md" onClick={handleLogout}>
          <LogOut className="mr-2 h-5 w-5" />
          Log out
        </Button>
      </div>
    </div>
  )
}

