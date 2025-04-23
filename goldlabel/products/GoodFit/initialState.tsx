export type GoodfitState = {
  initted: boolean;
  examples?: any;
};

const exampleResume = "Senior JavaScript Developer with over 20 years of experience and a deep focus on modern React architecture, systems design, and DevOps. Proven success delivering React/Redux applications with robust CI/CD pipelines, containerisation, and scalable architecture. Strong track record in remote contract roles and hybrid teams using TypeScript, Redux-Saga, Docker, and GraphQL. Equally comfortable debugging code, mentoring engineers, or discussing systems strategy with stakeholders.";

const exampleJD = "Full Stack Blockchain Developer London, Hybrid Working £100,000-£130,000Are you looking to join an expanding Web3 start-up within FinTech and have experience in a Full Stack Blockchain environment? This business has been going for just over 2 years but have rapidly expanded in the last 12months and have plans to increase headcount in the coming months!  They are essentially changing the face of the Web3 crypto ecosystem and have developed their own frameworks for managing clients and accounts aimed at taking Web3 products to the next level. By doing this they have built platforms for developers to use which works effectively across different chains and has resulted in massive growth across the company leading to the need for this hire.  They are looking for a good level of experience working in blockchain environments while having the core development skills to build backend services, complex software systems and understand libraries such as web3 and ethers.js.  The role is based in Central London and require office working of 2-3 days a week.  The Role Build modern, responsive front-end interfaces using React Develop scalable back-end services using Node.js and TypeScript. Integrate blockchain interactions using web3.js, ethers.js or Viem. Collaborate closely with product, design, and other developers to create seamless UX. Write clean, well-tested, and secure code. Keep up with evolving blockchain ecosystems, and recommend emerging tools and best practices. Core Requirements 5+ years in a Full Stack development environment. 2+ years working directly with blockchain technologies. Core Skills: Typescript, React, Nodejs, Web3, Ethers.js Desired Skills: Bitcoin, Solana, Solidity. Excellent problem solving skills and ability to lead change. Confident collaborative skills working across different teams. Good communicator and a self-starter mindset. Desire to keep developing Blockchain knowledge. Salary: £100,000-£130,000 If that sounds of interest, please apply and I can give you a call today!";

export const goodfitState: GoodfitState = {
  initted: false,
  examples: {
    resume: exampleResume,
    jd: exampleJD,
  }
};
