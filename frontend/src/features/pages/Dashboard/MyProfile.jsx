import React, { useState } from "react";
import { useUserData } from "@/contexts/UserContext";
import { updateProfile } from "@/api/services/user.api";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Avatar,
    AvatarFallback,
} from "@/components/ui/avatar";

import { Mail, User, Edit2, Save, X } from "lucide-react";

const MyProfile = () => {
    const { user, setUser } = useUserData();

    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        name: user?.name || "",
        email: user?.email || "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSave = async () => {
        try {
            setLoading(true);

            const res = await updateProfile(formData);

            if (res?.success) {
                setUser(res.user);
                setIsEditing(false);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        setFormData({
            name: user?.name || "",
            email: user?.email || "",
        });
        setIsEditing(false);
    };

    return (
        <div className="min-h-screen bg-slate-100 p-4 md:p-8">
            <Card className="max-w-3xl mx-auto shadow-xl rounded-2xl">
                <CardHeader className="text-center">
                    <CardTitle className="text-3xl font-bold">
                        My Profile
                    </CardTitle>
                    <CardDescription>
                        Manage your account information
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">

                        <Avatar className="h-24 w-24 md:h-32 md:w-32">
                            <AvatarFallback className="text-3xl">
                                {user?.name?.charAt(0)}
                            </AvatarFallback>
                        </Avatar>

                        <div className="flex-1 w-full space-y-5">

                            <div>
                                <label className="flex items-center gap-2 mb-2 text-sm text-gray-500">
                                    <User size={16} />
                                    Name
                                </label>

                                {isEditing ? (
                                    <Input
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                    />
                                ) : (
                                    <p className="font-medium">{user?.name}</p>
                                )}
                            </div>

                            <div>
                                <label className="flex items-center gap-2 mb-2 text-sm text-gray-500">
                                    <Mail size={16} />
                                    Email
                                </label>

                                {isEditing ? (
                                    <Input
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                ) : (
                                    <p className="font-medium break-all">
                                        {user?.email}
                                    </p>
                                )}
                            </div>

                            <div className="flex flex-col sm:flex-row gap-3">
                                {isEditing ? (
                                    <>
                                        <Button
                                            onClick={handleSave}
                                            disabled={loading}
                                        >
                                            <Save className="mr-2 h-4 w-4" />
                                            {loading ? "Saving..." : "Save"}
                                        </Button>

                                        <Button
                                            variant="destructive"
                                            onClick={handleCancel}
                                        >
                                            <X className="mr-2 h-4 w-4" />
                                            Cancel
                                        </Button>
                                    </>
                                ) : (
                                    <Button onClick={() => setIsEditing(true)}>
                                        <Edit2 className="mr-2 h-4 w-4" />
                                        Edit Profile
                                    </Button>
                                )}
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default MyProfile;