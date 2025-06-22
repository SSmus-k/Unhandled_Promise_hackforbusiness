import React from 'react'

export default function Footer() {
  return (
    <footer className="bg-transparent footer sm:footer-horizontal text-base-content p-10">
  <aside>
    <img src="Images/hariyo1.png" alt="HariyoNetra Logo" className='w-40' />
  </aside>
  <nav>
    <h6 className="footer-title">Company</h6>
    <a className="link link-hover">About us</a>
    <a className="link link-hover">Contact</a>
    <a className="link link-hover">Jobs</a>
    <a className="link link-hover">Press kit</a>
  </nav>
  <nav>
    <h6 className="footer-title">Legal</h6>
    <a className="link link-hover">Terms of use</a>
    <a className="link link-hover">Privacy policy</a>
    <a className="link link-hover">Cookie policy</a>
  </nav>
</footer>
  )
}
