import { Layout } from "~/views/layout.ts";

export const TermsOfUsePage = () => {
  return (
    <Layout title="Terms of Use">
      <main class="container my-5">
        <div class="row">
          <article class="col-8 offset-2">
            <h1 class="display-3 mb-4">Terms of Use</h1>

            <p class="text-muted">Last Updated: August 24, 2024</p>

            <section class="mb-5">
              <h2 class="display-6 mb-4">1. Acceptance of Terms</h2>
              <p class="fs-5">
                By accessing or using BasicTODO (the "Service"), you agree to be
                bound by these Terms of Use ("Terms"). If you disagree with any
                part of the terms, you may not access the Service.
              </p>
            </section>

            <section class="mb-5">
              <h2 class="display-6 mb-4">2. Description of Service</h2>
              <p class="fs-5">
                BasicTODO is a web-based application that allows users to create
                and manage personal to-do lists.
              </p>
            </section>

            <section class="mb-5">
              <h2 class="display-6 mb-4">3. User Accounts and Registration</h2>
              <p class="fs-5">
                3.1. You may be required to create an account to use certain
                features of the Service.
              </p>
              <p class="fs-5">
                3.2. You are responsible for maintaining the confidentiality of
                your account and password.
              </p>
              <p class="fs-5">
                3.3. You agree to provide accurate, current, and complete
                information during the registration process.
              </p>
            </section>

            <section class="mb-5">
              <h2 class="display-6 mb-4">4. User Responsibilities</h2>
              <p class="fs-5">
                4.1. You are responsible for all activities that occur under
                your account.
              </p>
              <p class="fs-5">
                4.2. You agree not to use the Service for any illegal or
                unauthorized purpose.
              </p>
              <p class="fs-5">
                4.3. You must not transmit any worms, viruses, or any code of a
                destructive nature.
              </p>
            </section>

            <section class="mb-5">
              <h2 class="display-6 mb-4">5. Intellectual Property Rights</h2>
              <p class="fs-5">
                5.1. The Service and its original content, features, and
                functionality are owned by Basic Productivity Ltd. and are
                protected by international copyright, trademark, patent, trade
                secret, and other intellectual property or proprietary rights
                laws.
              </p>
              <p class="fs-5">
                5.2. You retain any and all of your rights to any content you
                submit, post, or display on or through the Service.
              </p>
            </section>

            <section class="mb-5">
              <h2 class="display-6 mb-4">6. Privacy Policy</h2>
              <p class="fs-5">
                Your use of the Service is also governed by our Privacy Policy,
                which can be found <a href="/privacy-policy">here</a>.
              </p>
            </section>

            <section class="mb-5">
              <h2 class="display-6 mb-4">7. Limitation of Liability</h2>
              <p class="fs-5">
                7.1. Basic Productivity Ltd. shall not be liable for any
                indirect, incidental, special, consequential or punitive
                damages, including without limitation, loss of profits, data,
                use, goodwill, or other intangible losses, resulting from your
                access to or use of or inability to access or use the Service.
              </p>
              <p class="fs-5">
                7.2. Basic Productivity Ltd. shall not be responsible for any
                damages, liability or losses arising out of: (i) your use of or
                reliance on the Service or your inability to access or use the
                Service; or (ii) any transaction or relationship between you and
                any third party, even if Basic Productivity Ltd. has been
                advised of the possibility of such damages.
              </p>
            </section>

            <section class="mb-5">
              <h2 class="display-6 mb-4">
                8. Modifications to Service and Terms
              </h2>
              <p class="fs-5">
                8.1. We reserve the right to modify or discontinue, temporarily
                or permanently, the Service (or any part thereof) with or
                without notice.
              </p>
              <p class="fs-5">
                8.2. We reserve the right to modify these Terms at any time. We
                will notify you of any changes by posting the new Terms on this
                page.
              </p>
            </section>

            <section class="mb-5">
              <h2 class="display-6 mb-4">9. Termination</h2>
              <p class="fs-5">
                9.1. We may terminate or suspend your account immediately,
                without prior notice or liability, for any reason whatsoever,
                including without limitation if you breach the Terms.
              </p>
              <p class="fs-5">
                9.2. Upon termination, your right to use the Service will
                immediately cease.
              </p>
            </section>

            <section class="mb-5">
              <h2 class="display-6 mb-4">10. Governing Law and Jurisdiction</h2>
              <p class="fs-5">
                These Terms shall be governed and construed in accordance with
                the laws of United Kingdom, without regard to its conflict of
                law provisions. Our failure to enforce any right or provision of
                these Terms will not be considered a waiver of those rights.
              </p>
            </section>

            <section class="mb-5">
              <h2 class="display-6 mb-4">11. Contact Us</h2>
              <p class="fs-5">
                If you have any questions about these Terms, please contact us
                at <a href="mailto:dont@bzzr.me">dont@bzzr.me</a>.
              </p>
            </section>

            <p class="my-5">
              <a href="/">Back to the home page</a>
            </p>
          </article>
        </div>
      </main>
    </Layout>
  );
};
