import { UserButton, ClerkProvider, RedirectToSignIn, SignedIn, SignedOut } from "@clerk/nextjs";
import styles from "./globals.scss";
import styles1 from "./home.scss"
import Link from 'next/link';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

export default function Landing() {

  return (
    <div className="home">
      <nav>
        <SignedOut>
          <Link className="signin" href="/sign-in">Sign In</Link>
          <Link className="signup" href="/sign-up">Sign Up</Link>
        </SignedOut>
        <SignedIn>
          <div className="h-screen">
            <UserButton afterSignOutUrl="/"/>
          </div>
        </SignedIn>
      </nav>
    
      <section id="hero">

        {/* <div className="h-screen">
          <UserButton afterSignOutUrl="/"/>
        </div> */}

        {/* <video
          src="https://cdn.vidzflow.com/v/H0LDXZjsnq_1080p_1703000142.mp4"
          autoPlay
          loop
          muted
        /> */}

        <div className="hero__video--lighting"></div>
        <div className="hero__inner">
          {/* <Nav /> */}
          {/* <div className="divider"></div> */}

          <div className="hero__below-divider">
            <div className="home__hero--headline">
              <div className="home__hero-1">
                <div>What if working out wasn't just a chore...</div>
              </div>
              {/* <div className="home__hero-2">
                <div>...</div>
              </div>
              <div className="home__hero-3">
                <div>Working out wasn't just a chore</div>
              </div> */}
              <div className="home__hero-4">
                <div>But a game?</div>
              </div>
            </div>
            <h1 className="hero__h1">
              Introducing Questify, the app that transforms your workout routine into an exciting game, motivating you to level up your fitness with each exercise session
            </h1>
            {/* <div className="hero__search--outer">
              <Searchbar search = {search}  setSearch = {setSearch} nav_funct={() => navigate('/bills')}/>
            </div> */}
          </div>


          <div className="call-action">
            <SignedIn>
              <Link className='start' href="/dashboard">
                  Let's Start
                  <FontAwesomeIcon icon={faArrowRight} />
              </Link>            
            </SignedIn>
            <SignedOut>
              <Link className='start' href="/sign-in">
                  Make an Account or Log in
                  <FontAwesomeIcon icon={faArrowRight} />
              </Link>            
            </SignedOut>            
          </div>


        </div>
      </section>
    </div>
  );
};