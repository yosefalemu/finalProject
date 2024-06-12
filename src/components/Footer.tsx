import MaxWidthWrapper from "./MaxWidthWrapper";

const Footer = () => {
  return (
    <div className="bg-customColor py-4 w-full text-customColorThree rounded-lg">
      <MaxWidthWrapper>
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-4 text-center flex flex-col gap-y-1">
            <h1 className="text-lg font-bold mb-2">Useful Links</h1>
            <ul>
              <li>
                <a
                  href="https://www.example.com"
                  className="text-customColorThree"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="https://www.example.com/about"
                  className="text-customColorThree"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="https://www.example.com/services"
                  className="text-customColorThree"
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="https://www.example.com/contact"
                  className="text-customColorThree"
                >
                  Contact
                </a>
              </li>
              <li>
                <a
                  href="https://www.example.com/privacy"
                  className="text-customColorThree"
                >
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
          <div className="col-span-4 text-center flex flex-col gap-y-1">
            <h1 className="text-lg font-bold mb-2">Documents</h1>
            <ul>
              <li>
                <a
                  href="https://www.example.com/docs/annual-report.pdf"
                  className="text-customColorThree"
                >
                  Annual Report 2023
                </a>
              </li>
              <li>
                <a
                  href="https://www.example.com/docs/terms.pdf"
                  className="text-customColorThree"
                >
                  Terms and Conditions
                </a>
              </li>
              <li>
                <a
                  href="https://www.example.com/docs/policy.pdf"
                  className="text-customColorThree"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="https://www.example.com/docs/guidelines.pdf"
                  className="text-customColorThree"
                >
                  User Guidelines
                </a>
              </li>
            </ul>
          </div>
          <div className="col-span-4 text-center flex flex-col gap-y-1">
            <h1 className="text-lg font-bold mb-2">Address</h1>
            <p>
              Ethiopian Federal Police Headquarters
              <br />
              Addis Ababa, Ethiopia
              <br />
              Phone: +251 11 123 4567
              <br />
              Email: info@ethiopianpolice.gov.et
            </p>
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default Footer;
