import { useState, useEffect, useRef } from 'react';
import './App.css';

function App() {
    // Form input states
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    
    // UI states
    const [isLoading, setIsLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errors, setErrors] = useState({});
    const form = useRef();

    useEffect(() => {
        const observerOptions = {
            threshold: 0.2,
            rootMargin: '0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                }
            });
        }, observerOptions);

        const animatedElements = document.querySelectorAll('.contact h2, .contact-container, .contact-info h3, .contact-info p, .contact-reasons li, .form-group, .submit-btn');

        animatedElements.forEach(el => observer.observe(el));

        return () => observer.disconnect();
    }, []);

    // Individual input handlers
    const handleNameChange = (e) => {
        setName(e.target.value);
        if (errors.name) setErrors({ ...errors, name: '' });
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        if (errors.email) setErrors({ ...errors, email: '' });
    };

    const handleMessageChange = (e) => {
        setMessage(e.target.value);
        if (errors.message) setErrors({ ...errors, message: '' });
    };

    // Simple form validation
    const validateForm = () => {
        const newErrors = {};
        
        if (!name.trim()) {
            newErrors.name = 'Name is required';
        } else if (name.trim().length < 2) {
            newErrors.name = 'Name must be at least 2 characters';
        }
        
        if (!email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = 'Please enter a valid email';
        }
        
        if (!message.trim()) {
            newErrors.message = 'Message is required';
        } else if (message.trim().length < 10) {
            newErrors.message = 'Message must be at least 10 characters';
        }
        
        return newErrors;
    };

    // Form submission handler
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Check for errors
        const newErrors = validateForm();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        
        setIsLoading(true);
        setErrors({});

        try {
            // Simulate sending email
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            console.log('Form data:', { name, email, message });
            
            // Show success message
            setSuccessMessage(`Thank you ${name}! Your message has been sent successfully!`);
            
            // Clear form
            setName('');
            setEmail('');
            setMessage('');
            
        } catch (error) {
            console.error('Failed to send:', error);
            setErrors({ submit: 'Failed to send message. Please try again.' });
        } finally {
            setIsLoading(false);
            // Hide success message after 5 seconds
            if (successMessage) {
                setTimeout(() => setSuccessMessage(''), 5000);
            }
        }
    };

    // Clear form handler
    const handleReset = () => {
        setName('');
        setEmail('');
        setMessage('');
        setErrors({});
        setSuccessMessage('');
    };

    return (
        <section id="contact" className="contact">
            <div className="contact-waves-top">
                <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" className="shape-fill"></path>
                </svg>
            </div>

            <h2>Get In Touch</h2>

            <div className="contact-container">
                <div className="contact-info">
                    <h3>Let's Create Something Together</h3>
                    <p>
                        I'm always excited to connect with fellow developers, potential clients,
                        and anyone interested in web development. Whether you have a project in mind
                        or just want to say hello, I'd love to hear from you!
                    </p>
                    <ul className="contact-reasons">
                        <li>
                            <i className="fas fa-handshake"></i>
                            <span>Project Collaborations</span>
                        </li>
                        <li>
                            <i className="fas fa-code"></i>
                            <span>Custom Development Work</span>
                        </li>
                        <li>
                            <i className="fas fa-question-circle"></i>
                            <span>Technical Questions</span>
                        </li>
                        <li>
                            <i className="fas fa-lightbulb"></i>
                            <span>Development Advice</span>
                        </li>
                        <li>
                            <i className="fas fa-comments"></i>
                            <span>General Inquiries</span>
                        </li>
                    </ul>
                </div>

                <form ref={form} onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input 
                            type="text" 
                            value={name}
                            onChange={handleNameChange}
                            required 
                            placeholder="Your Name"
                            className={errors.name ? 'error' : ''}
                        />
                        {errors.name && <span className="error-text">{errors.name}</span>}
                    </div>
                    <div className="form-group">
                        <input 
                            type="email" 
                            value={email}
                            onChange={handleEmailChange}
                            required 
                            placeholder="Your Email"
                            className={errors.email ? 'error' : ''}
                        />
                        {errors.email && <span className="error-text">{errors.email}</span>}
                    </div>
                    <div className="form-group">
                        <textarea 
                            value={message}
                            onChange={handleMessageChange}
                            required 
                            placeholder="Your Message" 
                            rows="5"
                            className={errors.message ? 'error' : ''}
                        />
                        {errors.message && <span className="error-text">{errors.message}</span>}
                    </div>

                    {successMessage && (
                        <div className="form-status success">
                            {successMessage}
                        </div>
                    )}
                    
                    {errors.submit && (
                        <div className="form-status error">
                            {errors.submit}
                        </div>
                    )}

                    <div className="form-buttons">
                        <button
                            type="submit"
                            className="submit-btn"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <>
                                    <span className="btn-text">Sending...</span>
                                    <span className="btn-spinner" />
                                </>
                            ) : (
                                <span className="btn-text">Send Message</span>
                            )}
                        </button>
                        
                        <button
                            type="button"
                            className="reset-btn"
                            onClick={handleReset}
                            disabled={isLoading}
                        >
                            Clear Form
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
}

export default App;
