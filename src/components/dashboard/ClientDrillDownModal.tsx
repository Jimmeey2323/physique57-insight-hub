import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  User, 
  Calendar, 
  MapPin, 
  DollarSign, 
  Target, 
  TrendingUp,
  Clock,
  CreditCard,
  Phone,
  Mail,
  Activity
} from 'lucide-react';
import { formatCurrency, formatDate } from '@/utils/formatters';
import { NewClientData } from '@/types/dashboard';

interface ClientDrillDownModalProps {
  isOpen: boolean;
  onClose: () => void;
  client: NewClientData | null;
}

export const ClientDrillDownModal: React.FC<ClientDrillDownModalProps> = ({
  isOpen,
  onClose,
  client
}) => {
  if (!client) return null;

  const getConversionStatusColor = (status: string) => {
    switch (status) {
      case 'Converted': return 'bg-green-100 text-green-800 border-green-200';
      case 'Not Converted': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getRetentionStatusColor = (status: string) => {
    switch (status) {
      case 'Retained': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Not Retained': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'At Risk': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <User className="w-6 h-6" />
            Client Profile: {client.firstName} {client.lastName}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Header Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
              <CardContent className="p-4 text-center">
                <DollarSign className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                <div className="text-2xl font-bold text-blue-700">{formatCurrency(client.ltv || 0)}</div>
                <div className="text-sm text-blue-600">Lifetime Value</div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
              <CardContent className="p-4 text-center">
                <Target className="w-8 h-8 mx-auto mb-2 text-green-600" />
                <div className="text-2xl font-bold text-green-700">{client.visitsPostTrial || 0}</div>
                <div className="text-sm text-green-600">Visits Post Trial</div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-50 to-violet-50 border-purple-200">
              <CardContent className="p-4 text-center">
                <Clock className="w-8 h-8 mx-auto mb-2 text-purple-600" />
                <div className="text-2xl font-bold text-purple-700">{client.conversionSpan || 0}</div>
                <div className="text-sm text-purple-600">Days to Convert</div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-orange-50 to-red-50 border-orange-200">
              <CardContent className="p-4 text-center">
                <Activity className="w-8 h-8 mx-auto mb-2 text-orange-600" />
                <div className="text-2xl font-bold text-orange-700">{client.purchaseCountPostTrial || 0}</div>
                <div className="text-sm text-orange-600">Purchases Made</div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid grid-cols-3 w-full">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="journey">Journey</TabsTrigger>
              <TabsTrigger value="financials">Financials</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <User className="w-5 h-5" />
                      Personal Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-gray-500" />
                      <span className="text-sm">{client.email || 'Not provided'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-gray-500" />
                      <span className="text-sm">{client.phoneNumber || 'Not provided'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-gray-500" />
                      <span className="text-sm">{client.homeLocation || 'Not specified'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-500" />
                      <span className="text-sm">Member since: {formatDate(client.firstVisitDate)}</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="w-5 h-5" />
                      Status & Performance
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Conversion Status:</span>
                      <Badge className={getConversionStatusColor(client.conversionStatus || 'Unknown')}>
                        {client.conversionStatus || 'Unknown'}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Retention Status:</span>
                      <Badge className={getRetentionStatusColor(client.retentionStatus || 'Unknown')}>
                        {client.retentionStatus || 'Unknown'}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Client Type:</span>
                      <Badge variant="outline">{client.isNew || 'Unknown'}</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Trainer:</span>
                      <span className="text-sm font-medium">{client.trainerName || 'Not assigned'}</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="journey" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    Client Journey Timeline
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm">1</div>
                      <div className="flex-1">
                        <div className="font-medium">First Visit</div>
                        <div className="text-sm text-gray-600">
                          {formatDate(client.firstVisitDate)} at {client.firstVisitLocation}
                        </div>
                        <div className="text-sm text-gray-500">Type: {client.firstVisitType}</div>
                      </div>
                    </div>

                    {client.conversionStatus === 'Converted' && (
                      <div className="flex items-center gap-4 p-3 bg-green-50 rounded-lg border border-green-200">
                        <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-sm">2</div>
                        <div className="flex-1">
                          <div className="font-medium">Conversion</div>
                          <div className="text-sm text-gray-600">
                            Converted after {client.conversionSpan} days
                          </div>
                          <div className="text-sm text-gray-500">
                            First Purchase: {client.firstPurchase || 'Not specified'}
                          </div>
                        </div>
                      </div>
                    )}

                    {client.membershipsBoughtPostTrial && (
                      <div className="flex items-center gap-4 p-3 bg-purple-50 rounded-lg border border-purple-200">
                        <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white text-sm">3</div>
                        <div className="flex-1">
                          <div className="font-medium">Ongoing Membership</div>
                          <div className="text-sm text-gray-600">
                            Current: {client.membershipUsed}
                          </div>
                          <div className="text-sm text-gray-500">
                            Post-trial purchases: {client.membershipsBoughtPostTrial}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="financials" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <DollarSign className="w-5 h-5" />
                      Financial Summary
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between items-center py-2 border-b">
                      <span className="text-sm text-gray-600">Total LTV:</span>
                      <span className="text-lg font-bold text-green-600">{formatCurrency(client.ltv || 0)}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b">
                      <span className="text-sm text-gray-600">Post-Trial Purchases:</span>
                      <span className="font-medium">{client.purchaseCountPostTrial || 0}</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-sm text-gray-600">Payment Method:</span>
                      <Badge variant="outline">{client.paymentMethod || 'Not specified'}</Badge>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CreditCard className="w-5 h-5" />
                      Membership Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between items-center py-2 border-b">
                      <span className="text-sm text-gray-600">Current Plan:</span>
                      <span className="font-medium">{client.membershipUsed || 'None'}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b">
                      <span className="text-sm text-gray-600">Class Number:</span>
                      <span className="font-medium">{client.classNo || 0}</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-sm text-gray-600">Period:</span>
                      <span className="font-medium">{client.period || 'Not specified'}</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
};