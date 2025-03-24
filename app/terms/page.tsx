"use client"

import { useState } from "react"
import MobileLayout from "@/components/mobile-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { FileText, Shield, AlertCircle } from "lucide-react"

export default function TermsPage() {
  const [activeTab, setActiveTab] = useState("terms")

  return (
    <MobileLayout title="Terms & Privacy" showBackButton>
      <div className="p-4 space-y-6">
        <Tabs defaultValue="terms" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="terms">Terms of Service</TabsTrigger>
            <TabsTrigger value="privacy">Privacy Policy</TabsTrigger>
          </TabsList>

          <TabsContent value="terms" className="mt-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center">
                  <FileText className="h-5 w-5 mr-2" />
                  Terms of Service
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[60vh]">
                  <div className="space-y-4 text-sm">
                    <h3 className="font-semibold text-base">1. Introduction</h3>
                    <p>
                      Welcome to FINNAVA ("we," "our," or "us"). By accessing or using our mobile application and
                      services, you agree to be bound by these Terms of Service ("Terms").
                    </p>

                    <h3 className="font-semibold text-base">2. Services Description</h3>
                    <p>
                      FINNAVA is an AI-powered financial assistant that helps users manage their finances, track
                      expenses, set budgets, and receive personalized financial insights. Our services include but are
                      not limited to expense tracking, budget management, financial goal setting, and AI-powered
                      financial advice.
                    </p>

                    <h3 className="font-semibold text-base">3. Account Registration</h3>
                    <p>
                      To use certain features of our services, you may need to register for an account. You agree to
                      provide accurate, current, and complete information during the registration process and to update
                      such information to keep it accurate, current, and complete.
                    </p>

                    <h3 className="font-semibold text-base">4. User Responsibilities</h3>
                    <p>
                      You are responsible for maintaining the confidentiality of your account credentials and for all
                      activities that occur under your account. You agree to notify us immediately of any unauthorized
                      use of your account or any other breach of security.
                    </p>

                    <h3 className="font-semibold text-base">5. Financial Data</h3>
                    <p>
                      Our services may allow you to connect your financial accounts from third-party financial
                      institutions. By connecting these accounts, you authorize us to access and store your financial
                      data for the purpose of providing our services.
                    </p>

                    <h3 className="font-semibold text-base">6. AI Financial Advice</h3>
                    <p>
                      The financial insights and recommendations provided by our AI are for informational purposes only
                      and should not be considered as professional financial advice. We recommend consulting with a
                      qualified financial advisor before making significant financial decisions.
                    </p>

                    <h3 className="font-semibold text-base">7. Intellectual Property</h3>
                    <p>
                      All content, features, and functionality of our services, including but not limited to text,
                      graphics, logos, icons, and software, are owned by FINNAVA and are protected by intellectual
                      property laws.
                    </p>

                    <h3 className="font-semibold text-base">8. Limitation of Liability</h3>
                    <p>
                      To the maximum extent permitted by law, FINNAVA shall not be liable for any indirect, incidental,
                      special, consequential, or punitive damages, including but not limited to loss of profits, data,
                      or use, arising out of or in connection with your use of our services.
                    </p>

                    <h3 className="font-semibold text-base">9. Termination</h3>
                    <p>
                      We reserve the right to terminate or suspend your account and access to our services at our sole
                      discretion, without notice, for conduct that we believe violates these Terms or is harmful to
                      other users, us, or third parties, or for any other reason.
                    </p>

                    <h3 className="font-semibold text-base">10. Changes to Terms</h3>
                    <p>
                      We may modify these Terms at any time. If we make changes, we will provide notice by posting the
                      updated Terms on our app and updating the "Last Updated" date. Your continued use of our services
                      after such notice constitutes your acceptance of the updated Terms.
                    </p>

                    <h3 className="font-semibold text-base">11. Governing Law</h3>
                    <p>
                      These Terms shall be governed by and construed in accordance with the laws of India, without
                      regard to its conflict of law provisions.
                    </p>

                    <p className="text-muted-foreground mt-6">Last Updated: March 12, 2025</p>
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="privacy" className="mt-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center">
                  <Shield className="h-5 w-5 mr-2" />
                  Privacy Policy
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[60vh]">
                  <div className="space-y-4 text-sm">
                    <h3 className="font-semibold text-base">1. Information We Collect</h3>
                    <p>
                      We collect information you provide directly to us, such as when you create an account, connect
                      financial accounts, or contact us for support. This may include personal information such as your
                      name, email address, phone number, and financial data.
                    </p>

                    <h3 className="font-semibold text-base">2. Financial Data</h3>
                    <p>
                      When you connect your financial accounts, we collect information about your transactions,
                      balances, and other financial data. This information is used to provide our services, including
                      expense tracking, budgeting, and personalized financial insights.
                    </p>

                    <h3 className="font-semibold text-base">3. How We Use Your Information</h3>
                    <p>
                      We use your information to provide, maintain, and improve our services, to develop new features,
                      to communicate with you, and to protect our services and users. We also use your financial data to
                      generate personalized financial insights and recommendations.
                    </p>

                    <h3 className="font-semibold text-base">4. Data Security</h3>
                    <p>
                      We implement appropriate security measures to protect your personal and financial information.
                      This includes encryption of sensitive data, secure server infrastructure, and regular security
                      audits. However, no method of transmission over the Internet or electronic storage is 100% secure.
                    </p>

                    <h3 className="font-semibold text-base">5. Data Sharing</h3>
                    <p>
                      We do not sell your personal information. We may share your information with third-party service
                      providers who help us provide our services, but only as necessary to provide these services to
                      you. We may also share information in response to legal requests or to protect our rights.
                    </p>

                    <h3 className="font-semibold text-base">6. Your Rights</h3>
                    <p>
                      You have the right to access, correct, or delete your personal information. You can also request a
                      copy of the personal information we hold about you. To exercise these rights, please contact us at
                      privacy@finnava.com.
                    </p>

                    <h3 className="font-semibold text-base">7. Data Retention</h3>
                    <p>
                      We retain your personal information for as long as necessary to provide our services and as
                      required by law. When we no longer need to use your information, we will securely delete or
                      anonymize it.
                    </p>

                    <h3 className="font-semibold text-base">8. Children's Privacy</h3>
                    <p>
                      Our services are not intended for children under the age of 18. We do not knowingly collect
                      personal information from children under 18. If we become aware that we have collected personal
                      information from a child under 18, we will take steps to delete such information.
                    </p>

                    <h3 className="font-semibold text-base">9. Changes to Privacy Policy</h3>
                    <p>
                      We may update this Privacy Policy from time to time. If we make significant changes, we will
                      notify you through the app or by email. Your continued use of our services after such notice
                      constitutes your acceptance of the updated Privacy Policy.
                    </p>

                    <h3 className="font-semibold text-base">10. Contact Us</h3>
                    <p>
                      If you have any questions or concerns about our Privacy Policy or data practices, please contact
                      us at privacy@finnava.com.
                    </p>

                    <p className="text-muted-foreground mt-6">Last Updated: March 12, 2025</p>
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 rounded-full bg-amber-100 dark:bg-amber-900/20 flex items-center justify-center">
                <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400" />
              </div>
              <div>
                <h3 className="font-medium">Important Notice</h3>
                <p className="text-sm text-muted-foreground">
                  By using FINNAVA, you agree to our Terms of Service and Privacy Policy. Please read these documents
                  carefully.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </MobileLayout>
  )
}

