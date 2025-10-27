'use client';

import { useState } from 'react';
import { Search, CheckCircle, AlertCircle, MapPin, Calendar } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Card, CardHeader, CardContent } from '../../components/ui/Card';
import { Layout } from '../../components/layout/Layout';
import { mockBatches, mockSupplyEvents } from '../../data/mockData';

export default function VerifyProduct() {
  const [batchCode, setBatchCode] = useState('');
  const [verificationResult, setVerificationResult] = useState<{
    isValid: boolean;
    product: string;
    batch: string;
    producer: string;
    harvestDate: string;
    location: string;
    certifications: string[];
    supplyEvents: Array<{
      event: string;
      timestamp: string;
      location: string;
      verified: boolean;
    }>;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleVerify = () => {
    setIsLoading(true);
    setTimeout(() => {
      const batch = mockBatches.find(b => b.code === batchCode);
      if (batch) {
        const events = mockSupplyEvents.filter(e => e.batchId === batch.id);
        setVerificationResult({
          isValid: true,
          product: batch.product,
          batch: batch.code,
          producer: batch.producer,
          harvestDate: batch.harvestDate,
          location: batch.location,
          certifications: batch.certifications,
          supplyEvents: events.map(e => ({
            event: e.event,
            timestamp: e.timestamp,
            location: e.location,
            verified: e.verified
          }))
        });
      } else {
        setVerificationResult({
          isValid: false,
          product: '',
          batch: '',
          producer: '',
          harvestDate: '',
          location: '',
          certifications: [],
          supplyEvents: []
        });
      }
      setIsLoading(false);
    }, 1000);
  };

  const eventIcons: Record<string, string> = {
    HARVEST: '🌱',
    PROCESS: '⚙️',
    PACKAGE: '📦',
    SHIP: '🚚',
    RECEIVE: '✅',
  };

  return (
    <Layout>
      <div className="min-h-screen bg-slate-50">
        <div className="bg-emerald-600 text-white py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <CheckCircle className="w-16 h-16 mx-auto mb-4" />
            <h1 className="text-4xl font-bold mb-4">Verify Product Authenticity</h1>
            <p className="text-emerald-100 text-lg">
              Enter the batch code from your product to verify its blockchain-tracked journey
            </p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="flex gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                  <Input
                    placeholder="Enter batch code (e.g., YRG-2024-001)"
                    value={batchCode}
                    onChange={(e) => setBatchCode(e.target.value)}
                    className="pl-10"
                    onKeyPress={(e) => e.key === 'Enter' && handleVerify()}
                  />
                </div>
                <Button
                  variant="primary"
                  onClick={handleVerify}
                  isLoading={isLoading}
                  disabled={!batchCode}
                >
                  Verify
                </Button>
              </div>
            </CardContent>
          </Card>

          {verificationResult && (
            <>
              {!verificationResult.isValid ? (
                <Card className="border-red-200 bg-red-50">
                  <CardContent className="p-6 text-center">
                    <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-red-900 mb-2">Batch Not Found</h2>
                    <p className="text-red-700">
                      The batch code you entered could not be verified. Please check the code and try again.
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <>
                  <Card className="border-emerald-200 bg-emerald-50 mb-8">
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-3 mb-4">
                        <CheckCircle className="w-8 h-8 text-emerald-600" />
                        <div>
                          <h2 className="text-2xl font-bold text-emerald-900">Verified Authentic</h2>
                          <p className="text-emerald-700">This product is blockchain-verified</p>
                        </div>
                      </div>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-emerald-700 mb-1">Batch Code</p>
                          <p className="font-mono font-bold text-emerald-900">{verificationResult.batch.code}</p>
                        </div>
                        <div>
                          <p className="text-sm text-emerald-700 mb-1">Product</p>
                          <p className="font-semibold text-emerald-900">{verificationResult.batch.productName}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="mb-8">
                    <CardHeader>
                      <h3 className="text-xl font-bold text-slate-900">Supply Chain Journey</h3>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {verificationResult.supplyEvents.map((event, idx: number) => (
                          <div key={idx} className="flex items-start space-x-4 pb-4 border-b last:border-0">
                            <div className="text-2xl">{eventIcons[event.event]}</div>
                            <div className="flex-1">
                              <h4 className="font-semibold text-slate-900">{event.event}</h4>
                              <p className="text-sm text-slate-600">{event.location}</p>
                              <div className="flex items-center space-x-4 mt-2 text-xs text-slate-500">
                                <span className="flex items-center">
                                  <MapPin className="w-3 h-3 mr-1" />
                                  {event.location}
                                </span>
                                <span className="flex items-center">
                                  <Calendar className="w-3 h-3 mr-1" />
                                  {new Date(event.timestamp).toLocaleDateString()}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <h3 className="text-xl font-bold text-slate-900">QR Code</h3>
                    </CardHeader>
                    <CardContent className="flex justify-center p-8">
                      <QRCodeSVG value={verificationResult.batch.code} size={200} />
                    </CardContent>
                  </Card>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </Layout>
  );
}

