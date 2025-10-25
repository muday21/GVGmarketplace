'use client';

import { useState, useEffect } from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Edit3, 
  Save, 
  X, 
  Camera,
  Shield,
  Award,
  Clock
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Card, CardHeader, CardContent } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { Badge } from '../../components/ui/Badge';
import { Layout } from '../../components/layout/Layout';

interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  joinDate: string;
  lastActive: string;
  profileImage: string;
  bio: string;
  location: string;
  company?: string;
  website?: string;
  socialMedia?: {
    twitter?: string;
    linkedin?: string;
    facebook?: string;
  };
  preferences: {
    language: string;
    timezone: string;
    notifications: boolean;
    marketing: boolean;
  };
}

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<UserProfile>({
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+251 911 234 567',
    role: 'BUYER',
    joinDate: '2024-01-15',
    lastActive: '2024-01-20',
    profileImage: '',
    bio: 'Passionate about sustainable agriculture and blockchain technology. Love supporting local farmers and transparent supply chains.',
    location: 'Addis Ababa, Ethiopia',
    company: 'GreenTech Solutions',
    website: 'https://johndoe.com',
    socialMedia: {
      twitter: '@johndoe',
      linkedin: 'linkedin.com/in/johndoe',
      facebook: 'facebook.com/johndoe'
    },
    preferences: {
      language: 'en',
      timezone: 'Africa/Addis_Ababa',
      notifications: true,
      marketing: false
    }
  });

  const [editProfile, setEditProfile] = useState<UserProfile>(profile);

  useEffect(() => {
    // Load user data from localStorage
    const userName = localStorage.getItem('userName') || 'Guest';
    const userEmail = localStorage.getItem('userEmail') || 'guest@example.com';
    const userRole = localStorage.getItem('userRole') || 'BUYER';
    
    setProfile(prev => ({
      ...prev,
      name: userName,
      email: userEmail,
      role: userRole
    }));
    
    setEditProfile(prev => ({
      ...prev,
      name: userName,
      email: userEmail,
      role: userRole
    }));
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
    setEditProfile(profile);
  };

  const handleSave = () => {
    setProfile(editProfile);
    setIsEditing(false);
    
    // Update localStorage
    localStorage.setItem('userName', editProfile.name);
    localStorage.setItem('userEmail', editProfile.email);
    
    // Show success message
    alert('Profile updated successfully!');
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditProfile(profile);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        if (isEditing) {
          setEditProfile(prev => ({ ...prev, profileImage: result }));
        } else {
          setProfile(prev => ({ ...prev, profileImage: result }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'BUYER':
        return 'bg-blue-100 text-blue-800';
      case 'PRODUCER':
        return 'bg-green-100 text-green-800';
      case 'ADMIN':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <Layout>
      <div className="min-h-screen bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-slate-900">Profile Settings</h1>
                <p className="text-slate-600 mt-2">Manage your account information and preferences</p>
              </div>
              {!isEditing && (
                <Button 
                  variant="primary" 
                  onClick={handleEdit}
                  className="flex items-center space-x-2"
                >
                  <Edit3 className="w-4 h-4" />
                  <span>Edit Profile</span>
                </Button>
              )}
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Profile Card */}
            <div className="lg:col-span-1">
              <Card>
                <CardContent className="p-6">
                  <div className="text-center">
                    {/* Profile Image */}
                    <div className="relative inline-block mb-4">
                      <div className="w-24 h-24 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center text-white text-2xl font-bold mx-auto">
                        {profile.profileImage ? (
                          <img 
                            src={profile.profileImage} 
                            alt={profile.name}
                            className="w-full h-full rounded-full object-cover"
                          />
                        ) : (
                          getInitials(profile.name)
                        )}
                      </div>
                      {isEditing && (
                        <label className="absolute bottom-0 right-0 bg-emerald-600 text-white rounded-full p-2 cursor-pointer hover:bg-emerald-700 transition-colors">
                          <Camera className="w-4 h-4" />
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                          />
                        </label>
                      )}
                    </div>

                    {/* User Info */}
                    <h2 className="text-xl font-bold text-slate-900 mb-2">
                      {isEditing ? editProfile.name : profile.name}
                    </h2>
                    <p className="text-slate-600 mb-3">
                      {isEditing ? editProfile.email : profile.email}
                    </p>
                    
                    <Badge className={`${getRoleColor(profile.role)} mb-4`}>
                      {profile.role} Account
                    </Badge>

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-4 mt-6">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-slate-900">12</div>
                        <div className="text-sm text-slate-600">Orders</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-slate-900">4.8</div>
                        <div className="text-sm text-slate-600">Rating</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Profile Details */}
            <div className="lg:col-span-2">
              <div className="space-y-6">
                {/* Personal Information */}
                <Card>
                  <CardHeader>
                    <h3 className="text-lg font-semibold text-slate-900">Personal Information</h3>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Full Name
                        </label>
                        {isEditing ? (
                          <Input
                            value={editProfile.name}
                            onChange={(e) => setEditProfile(prev => ({ ...prev, name: e.target.value }))}
                            placeholder="Enter your full name"
                          />
                        ) : (
                          <div className="flex items-center space-x-2 p-3 bg-slate-50 rounded-lg">
                            <User className="w-4 h-4 text-slate-500" />
                            <span className="text-slate-900">{profile.name}</span>
                          </div>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Email Address
                        </label>
                        {isEditing ? (
                          <Input
                            type="email"
                            value={editProfile.email}
                            onChange={(e) => setEditProfile(prev => ({ ...prev, email: e.target.value }))}
                            placeholder="Enter your email"
                          />
                        ) : (
                          <div className="flex items-center space-x-2 p-3 bg-slate-50 rounded-lg">
                            <Mail className="w-4 h-4 text-slate-500" />
                            <span className="text-slate-900">{profile.email}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Phone Number
                        </label>
                        {isEditing ? (
                          <Input
                            value={editProfile.phone}
                            onChange={(e) => setEditProfile(prev => ({ ...prev, phone: e.target.value }))}
                            placeholder="Enter your phone number"
                          />
                        ) : (
                          <div className="flex items-center space-x-2 p-3 bg-slate-50 rounded-lg">
                            <Phone className="w-4 h-4 text-slate-500" />
                            <span className="text-slate-900">{profile.phone}</span>
                          </div>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Location
                        </label>
                        {isEditing ? (
                          <Input
                            value={editProfile.location}
                            onChange={(e) => setEditProfile(prev => ({ ...prev, location: e.target.value }))}
                            placeholder="Enter your location"
                          />
                        ) : (
                          <div className="flex items-center space-x-2 p-3 bg-slate-50 rounded-lg">
                            <MapPin className="w-4 h-4 text-slate-500" />
                            <span className="text-slate-900">{profile.location}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Bio
                      </label>
                      {isEditing ? (
                        <textarea
                          value={editProfile.bio}
                          onChange={(e) => setEditProfile(prev => ({ ...prev, bio: e.target.value }))}
                          placeholder="Tell us about yourself"
                          className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                          rows={3}
                        />
                      ) : (
                        <div className="p-3 bg-slate-50 rounded-lg">
                          <p className="text-slate-900">{profile.bio}</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Account Information */}
                <Card>
                  <CardHeader>
                    <h3 className="text-lg font-semibold text-slate-900">Account Information</h3>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Member Since
                        </label>
                        <div className="flex items-center space-x-2 p-3 bg-slate-50 rounded-lg">
                          <Calendar className="w-4 h-4 text-slate-500" />
                          <span className="text-slate-900">{new Date(profile.joinDate).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Last Active
                        </label>
                        <div className="flex items-center space-x-2 p-3 bg-slate-50 rounded-lg">
                          <Clock className="w-4 h-4 text-slate-500" />
                          <span className="text-slate-900">{new Date(profile.lastActive).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Account Type
                        </label>
                        <div className="flex items-center space-x-2 p-3 bg-slate-50 rounded-lg">
                          <Award className="w-4 h-4 text-slate-500" />
                          <span className="text-slate-900">{profile.role} Account</span>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Security Status
                        </label>
                        <div className="flex items-center space-x-2 p-3 bg-slate-50 rounded-lg">
                          <Shield className="w-4 h-4 text-green-500" />
                          <span className="text-green-700 font-medium">Verified</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Preferences */}
                <Card>
                  <CardHeader>
                    <h3 className="text-lg font-semibold text-slate-900">Preferences</h3>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Language
                        </label>
                        {isEditing ? (
                          <Select
                            value={editProfile.preferences.language}
                            onChange={(e) => setEditProfile(prev => ({ 
                              ...prev, 
                              preferences: { ...prev.preferences, language: e.target.value }
                            }))}
                            options={[
                              { value: 'en', label: 'English' },
                              { value: 'am', label: 'አማርኛ' },
                              { value: 'or', label: 'Afaan Oromoo' }
                            ]}
                          />
                        ) : (
                          <div className="p-3 bg-slate-50 rounded-lg">
                            <span className="text-slate-900">English</span>
                          </div>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Timezone
                        </label>
                        {isEditing ? (
                          <Select
                            value={editProfile.preferences.timezone}
                            onChange={(e) => setEditProfile(prev => ({ 
                              ...prev, 
                              preferences: { ...prev.preferences, timezone: e.target.value }
                            }))}
                            options={[
                              { value: 'Africa/Addis_Ababa', label: 'Addis Ababa (GMT+3)' },
                              { value: 'Africa/Nairobi', label: 'Nairobi (GMT+3)' },
                              { value: 'UTC', label: 'UTC (GMT+0)' }
                            ]}
                          />
                        ) : (
                          <div className="p-3 bg-slate-50 rounded-lg">
                            <span className="text-slate-900">Addis Ababa (GMT+3)</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                        <div>
                          <h4 className="font-medium text-slate-900">Email Notifications</h4>
                          <p className="text-sm text-slate-600">Receive updates about your orders and account</p>
                        </div>
                        {isEditing ? (
                          <input
                            type="checkbox"
                            checked={editProfile.preferences.notifications}
                            onChange={(e) => setEditProfile(prev => ({ 
                              ...prev, 
                              preferences: { ...prev.preferences, notifications: e.target.checked }
                            }))}
                            className="w-4 h-4 text-emerald-600 border-slate-300 rounded focus:ring-emerald-500"
                          />
                        ) : (
                          <div className={`w-4 h-4 rounded-full ${profile.preferences.notifications ? 'bg-emerald-500' : 'bg-slate-300'}`} />
                        )}
                      </div>

                      <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                        <div>
                          <h4 className="font-medium text-slate-900">Marketing Communications</h4>
                          <p className="text-sm text-slate-600">Receive promotional emails and updates</p>
                        </div>
                        {isEditing ? (
                          <input
                            type="checkbox"
                            checked={editProfile.preferences.marketing}
                            onChange={(e) => setEditProfile(prev => ({ 
                              ...prev, 
                              preferences: { ...prev.preferences, marketing: e.target.checked }
                            }))}
                            className="w-4 h-4 text-emerald-600 border-slate-300 rounded focus:ring-emerald-500"
                          />
                        ) : (
                          <div className={`w-4 h-4 rounded-full ${profile.preferences.marketing ? 'bg-emerald-500' : 'bg-slate-300'}`} />
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Action Buttons */}
                {isEditing && (
                  <div className="flex space-x-3">
                    <Button 
                      variant="primary" 
                      onClick={handleSave}
                      className="flex items-center space-x-2"
                    >
                      <Save className="w-4 h-4" />
                      <span>Save Changes</span>
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={handleCancel}
                      className="flex items-center space-x-2"
                    >
                      <X className="w-4 h-4" />
                      <span>Cancel</span>
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
