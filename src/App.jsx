import { useState, useEffect, useRef } from 'react';
import './App.css';

function App() {
    // useState to manage form data values
    const [formData, setFormData] = useState({
        user_name: '',
        user_email: '',
        message: ''
    });
    
    // useState to manage form status and loading state
    const [formStatus, setFormStatus] = useState({ message: '', type: '' });
    const [isLoading, setIsLoading] = useState(false);
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

    // onChange event handler to manage form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
        
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prevErrors => ({
                ...prevErrors,
                [name]: ''
            }));
        }
    };

    // Form validation function
    const validateForm = () => {
        const newErrors = {};
        
        if (!formData.user_name.trim()) {
            newErrors.user_name = 'Name is required';
        } else if (formData.user_name.trim().length < 2) {
            newErrors.user_name = 'Name must be at least 2 characters';
        }
        
        if (!formData.user_email.trim()) {
            newErrors.user_email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.user_email)) {
            newErrors.user_email = 'Please enter a valid email';
        }
        
        if (!formData.message.trim()) {
            newErrors.message = 'Message is required';
        } else if (formData.message.trim().length < 10) {
            newErrors.message = 'Message must be at least 10 characters';
        }
        
        return newErrors;
    };

    // onClick/onSubmit event handler
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Validate form before submission
        const newErrors = validateForm();
        
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        
        setIsLoading(true);
        setErrors({});

        try {
            // Simulate email sending - replace with actual email service if needed
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            console.log('Form submitted with data:', formData);

            setFormStatus({
                message: `Thank you ${formData.user_name}! Message sent successfully! I'll get back to you soon.`,
                type: 'success'
            });
            
            // Reset form data
            setFormData({
                user_name: '',
                user_email: '',
                message: ''
            });
            
        } catch (error) {
            setFormStatus({
                message: 'Failed to send message. Please try again.',
                type: 'error'
            });
            console.error('Email sending failed:', error);
        } finally {
            setIsLoading(false);
            setTimeout(() => {
                setFormStatus({ message: '', type: '' });
            }, 5000);
        }
    };

    // onClick event handler for reset button
    const handleReset = () => {
        setFormData({
            user_name: '',
            user_email: '',
            message: ''
        });
        setErrors({});
        setFormStatus({ message: '', type: '' });
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
                            name="user_name" 
                            value={formData.user_name}
                            onChange={handleChange}
                            required 
                            placeholder="Your Name"
                            className={errors.user_name ? 'error' : ''}
                        />
                        {errors.user_name && <span className="error-text">{errors.user_name}</span>}
                    </div>
                    <div className="form-group">
                        <input 
                            type="email" 
                            name="user_email" 
                            value={formData.user_email}
                            onChange={handleChange}
                            required 
                            placeholder="Your Email"
                            className={errors.user_email ? 'error' : ''}
                        />
                        {errors.user_email && <span className="error-text">{errors.user_email}</span>}
                    </div>
                    <div className="form-group">
                        <textarea 
                            name="message" 
                            value={formData.message}
                            onChange={handleChange}
                            required 
                            placeholder="Your Message" 
                            rows="5"
                            className={errors.message ? 'error' : ''}
                        />
                        {errors.message && <span className="error-text">{errors.message}</span>}
                    </div>

                    {formStatus.message && (
                        <div className={`form-status ${formStatus.type}`}>
                            {formStatus.message}
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
