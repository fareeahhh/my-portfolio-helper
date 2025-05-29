function Contact() {
  return (
    <div>
      <h2>Contact</h2>
      <form>
        <input type="text" placeholder="Your Name" required /><br />
        <input type="email" placeholder="Your Email" required /><br />
        <textarea placeholder="Your Message"></textarea><br />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default Contact;
