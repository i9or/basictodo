import { Layout } from "~/views/layout.ts";

export const PrivacyPolicyPage = () => {
  return (
    <Layout title="Privacy Policy">
      <main class="container my-5">
        <div class="row">
          <article class="col-8 offset-2">
            <h1 class="display-3 mb-4">Privacy Policy</h1>
            <p class="text-muted">Last updated: August 24, 2024</p>

            <section class="mb-5">
              <h2 class="display-6 mb-4">1. Introduction</h2>
              <p class="fs-5">
                Welcome to BasicTODO ("we," "our," or "us"). We are committed to
                protecting your privacy and ensuring the security of your
                personal information. This Privacy Policy explains in detail how
                we collect, use, disclose, and safeguard your data when you use
                our web application ("the Service") for managing personal to-do
                lists. By using our Service, you agree to the collection and use
                of information in accordance with this policy.
              </p>
            </section>

            <section class="mb-5">
              <h2 class="display-6 mb-4">2. Information We Collect</h2>
              <h3>2.1 Information You Provide</h3>
              <p class="fs-5">
                We collect only the information you voluntarily provide to us:
              </p>
              <ul>
                <li class="fs-5">
                  Account information: This includes your email address and
                  password, which are necessary for creating and accessing your
                  account.
                </li>
                <li class="fs-5">
                  To-do list content: Any tasks, notes, due dates, or other
                  information you enter into your to-do lists.
                </li>
              </ul>
              <h3>2.2 Automatically Collected Information</h3>
              <p class="fs-5">
                We collect minimal technical information necessary for the
                operation of our Service:
              </p>
              <ul>
                <li class="fs-5">
                  Log data: This may include your IP address, browser type,
                  browser version, pages of our Service that you visit, the time
                  and date of your visit, and other statistics.
                </li>
                <li class="fs-5">
                  Cookies: We use essential cookies for technical reasons (see
                  Section 5 for more details).
                </li>
              </ul>
            </section>

            <section class="mb-5">
              <h2 class="display-6 mb-4">3. How We Use Your Information</h2>
              <p class="fs-5">
                We use your information solely for the purpose of providing and
                improving our to-do list management service. Specifically, we
                use your data for:
              </p>
              <h3>3.1 Account Management</h3>
              <ul>
                <li class="fs-5">
                  Authenticating your account and providing secure access to the
                  Service
                </li>
                <li class="fs-5">
                  Responding to your inquiries or support requests
                </li>
              </ul>
              <h3>3.2 Service Provision</h3>
              <ul>
                <li class="fs-5">Storing and managing your to-do lists</li>
                <li class="fs-5">
                  Syncing your data across devices (if applicable)
                </li>
              </ul>
              <h3>3.3 Service Improvement</h3>
              <ul>
                <li class="fs-5">
                  Analyzing usage patterns to improve the functionality and user
                  experience of our application
                </li>
                <li class="fs-5">Identifying and fixing technical issues</li>
              </ul>
            </section>

            <section class="mb-5">
              <h2 class="display-6 mb-4">4. Data Protection and Security</h2>
              <p class="fs-5">
                We are committed to protecting your data and have implemented
                the following measures:
              </p>
              <h3>4.1 Data Privacy</h3>
              <ul>
                <li class="fs-5">
                  Your to-do list content is private and not accessible to other
                  users or our staff, except when necessary for technical
                  support (with your explicit consent)
                </li>
                <li class="fs-5">
                  We do not sell, rent, trade, or otherwise share your personal
                  information with third parties for their commercial purposes
                </li>
              </ul>
              <h3>4.2 Data Security</h3>
              <ul>
                <li class="fs-5">
                  We use industry-standard encryption protocols (such as
                  SSL/TLS) to protect data transmission
                </li>
                <li class="fs-5">
                  Your data is stored in secure, access-controlled databases
                </li>
                <li class="fs-5">
                  We regularly update our systems and software to address
                  potential security vulnerabilities
                </li>
                <li class="fs-5">
                  Access to your data by our personnel is restricted and logged
                </li>
              </ul>
              <h3>4.3 Data Retention</h3>
              <ul>
                <li class="fs-5">
                  We retain your data for as long as your account is active or
                  as needed to provide you the Service
                </li>
                <li class="fs-5">
                  If you delete your account, we will delete your personal data
                  within 30 days, unless we are required to retain it for legal
                  reasons
                </li>
              </ul>
            </section>

            <section class="mb-5">
              <h2 class="display-6 mb-4">5. Cookies</h2>
              <p class="fs-5">
                Our web application uses cookies for technical reasons to ensure
                proper functionality. These cookies are essential for the
                application to work correctly and are not used for tracking or
                advertising purposes.
              </p>
              <h3>5.1 Essential Cookies</h3>
              <p class="fs-5">
                We use the following types of essential cookies:
              </p>
              <ul>
                <li class="fs-5">
                  Session cookies: To maintain your logged-in state and session
                  information
                </li>
                <li class="fs-5">
                  Preference cookies: To remember your settings and preferences
                  within the application
                </li>
              </ul>
              <h3>5.2 Cookie Control</h3>
              <p class="fs-5">
                Most web browsers allow you to control cookies through their
                settings preferences. However, limiting the ability of websites
                to set cookies may worsen your overall user experience and could
                impact the proper functioning of our Service.
              </p>
            </section>

            <section class="mb-5">
              <h2 class="display-6 mb-4">6. Data Retention and Deletion</h2>
              <h3>6.1 Account Deletion</h3>
              <p class="fs-5">
                You may request the deletion of your account and associated data
                at any time by contacting us at{" "}
                <a href="mailto:dont@bzzr.me">dont@bzzr.me</a>. Upon receiving
                such a request, we will:
              </p>
              <ul>
                <li class="fs-5">
                  Verify your identity to ensure the request is legitimate
                </li>
                <li class="fs-5">
                  Delete all your personal information and to-do list content
                  from our active systems within 30 days
                </li>
                <li class="fs-5">
                  Remove your data from our backups within 90 days
                </li>
              </ul>
              <h3>6.2 Data Export</h3>
              <p class="fs-5">
                Before account deletion, you may request an export of your to-do
                list data in a commonly used, machine-readable format.
              </p>
            </section>

            <section class="mb-5">
              <h2 class="display-6 mb-4">7. Children's Privacy</h2>
              <p class="fs-5">
                Our Service is not intended for use by children under the age of
                13. We do not knowingly collect personal information from
                children under 13. If we become aware that we have collected
                personal information from a child under 13 without parental
                consent, we will take steps to remove that information from our
                servers.
              </p>
            </section>

            <section class="mb-5">
              <h2 class="display-6 mb-4">8. Changes to This Policy</h2>
              <p class="fs-5">
                We may update this Privacy Policy from time to time. We will
                notify you of any changes by:
              </p>
              <ul>
                <li class="fs-5">
                  Posting the new Privacy Policy on this page
                </li>
                <li class="fs-5">
                  Updating the "Last updated" date at the top of this Privacy
                  Policy
                </li>
                <li class="fs-5">
                  Sending an email to users (for significant changes)
                </li>
              </ul>
              <p class="fs-5">
                We encourage you to review this Privacy Policy periodically for
                any changes.
              </p>
            </section>

            <section class="mb-5">
              <h2 class="display-6 mb-4">9. Your Rights</h2>
              <p class="fs-5">
                Depending on your jurisdiction, you may have certain rights
                regarding your personal information, including:
              </p>
              <ul>
                <li class="fs-5">
                  The right to access the personal information we hold about you
                </li>
                <li class="fs-5">
                  The right to request correction of inaccurate personal
                  information
                </li>
                <li class="fs-5">
                  The right to request deletion of your personal information
                </li>
                <li class="fs-5">
                  The right to object to or restrict processing of your personal
                  information
                </li>
              </ul>
              <p class="fs-5">
                To exercise these rights, please contact us using the
                information provided in Section 10.
              </p>
            </section>

            <section class="mb-5">
              <h2 class="display-6 mb-4">10. Contact Us</h2>
              <p class="fs-5">
                If you have any questions about this Privacy Policy, your
                personal information, or our data practices, please contact us
                at:
              </p>
              <address>
                <strong>Basic Productivity Ltd.</strong>
                <br />
                Email: &nbsp;
                <a href="mailto:dont@bzzr.me">dont@bzzr.me</a>
              </address>
            </section>

            <p class="fs-5 mt-5">
              By using our Service, you acknowledge that you have read and
              understood this Privacy Policy and agree to its terms.
            </p>

            <p class="my-5">
              <a href="/">Back to the home page</a>
            </p>
          </article>
        </div>
      </main>
    </Layout>
  );
};
