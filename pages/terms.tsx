import Layout from "@/components/Layout"

export default function TermsOfServicePage() {
  return (
    <Layout>
      <div className="flex w-full justify-center">
        <div className="flex flex-col gap-4 max-w-4xl my-8 p-4 break-words">
          <h1 className="text-2xl">Terms and Conditions</h1>
          <p>Last updated: Feb 25, 2023</p>
          <p>
            Please read these terms and conditions carefully before using Our
            Service.
          </p>
          <p>Have fun!</p>
        </div>
      </div>
    </Layout>
  )
}
