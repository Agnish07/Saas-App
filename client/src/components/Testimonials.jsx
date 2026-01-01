import { assets } from '../assets/assets';


const Testimonial = () => {
  const dummyTestimonialData = [
    {
      image: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200",
      name: 'John Doe',
      title: 'Marketing Director, TechCorp',
      content: 'ContentAI has revolutionized our content workflow. The quality is outstanding and saves us hours weekly.',
      rating: 4,
    },
    {
      image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200",
      name: 'Jane Smith',
      title: 'Content Creator, TechCorp',
      content: 'Our content creation process has become effortless and faster than ever.',
      rating: 5,
    },
    {
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&h=200&auto=format&fit=crop",
      name: 'David Lee',
      title: 'Content Writer, TechCorp',
      content: 'The AI tools helped us produce high-quality content consistently.',
      rating: 4,
    },
  ];

  return (
    <div className='px-4 sm:px-20 xl:px-32 py-24 bg-[#252525]'>
      <div className='text-center'>
        <h2 className='text-[#E6E6E6] text-[42px] font-semibold'>Loved by Creators</h2>
        <p className='text-[#A8A8A8] max-w-lg mx-auto'>
          Don't just take our word for it. Here's what our users say.
        </p>
      </div>

      <div className='flex flex-wrap mt-10 justify-center'>
        {dummyTestimonialData.map((t, i) => (
          <div
            key={i}
            className='p-8 mx-3 my-6 max-w-xs rounded-lg bg-[#1F1F1F] border border-[#2A2A2A] shadow-sm hover:-translate-y-1 transition-transform duration-200'
          >
            <div className="flex items-center gap-1">
              {Array(5).fill(0).map((_, idx) => (
                <img
                  key={idx}
                  src={idx < t.rating ? assets.star_icon : assets.star_dull_icon}
                  className='w-4 h-4'
                  alt='rating star'
                />
              ))}
            </div>

            <p className='text-[#9E9E9E] text-sm my-5'>"{t.content}"</p>
            <hr className='mb-5 border-[#2C2C2C]' />

            <div className='flex items-center gap-4'>
              <img src={t.image} className='w-12 h-12 rounded-full object-cover' alt='' />
              <div className='text-sm'>
                <h3 className='font-medium text-[#E6E6E6]'>{t.name}</h3>
                <p className='text-xs text-[#A8A8A8]'>{t.title}</p>
              </div>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonial;
