import Loader from "components/Loader";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => (
  <div>
    <Link
      prefetch={false}
      href={{ pathname: "/[username]", query: { username: "jeff123" } }}
    >
      link test
    </Link>
    <Loader show />
  </div>
);

export default Home;
