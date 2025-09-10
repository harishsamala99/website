import type { ServiceType, Cleaner } from './types';
import { DeepCleanIcon, CarpetIcon, KitchenIcon, BathroomIcon, WindowIcon, OfficeIcon } from './components/icons';

export const SERVICES_DATA: ServiceType[] = [
    { id: 'deep-cleaning', title: 'Deep Cleaning', description: 'A thorough cleaning of your entire home, top to bottom.', icon: DeepCleanIcon, price: '' },
    { id: 'carpet-cleaning', title: 'Carpet Cleaning', description: 'Professional steam cleaning for your carpets.', icon: CarpetIcon, price: '' },
    { id: 'kitchen-cleaning', title: 'Kitchen Cleaning', description: 'We sanitize all surfaces and clean appliances.', icon: KitchenIcon, price: '' },
    { id: 'bathroom-cleaning', title: 'Bathroom Cleaning', description: 'A complete disinfection and cleaning of bathrooms.', icon: BathroomIcon, price: '$100' },
    { id: 'window-cleaning', title: 'Window Cleaning', description: 'Streak-free cleaning for all interior and exterior windows.', icon: WindowIcon, price: '$150' },
    { id: 'office-cleaning', title: 'Office Cleaning', description: 'Customized cleaning plans for commercial spaces.', icon: OfficeIcon, price: 'Contact for Quote' },
];

export const HOUSE_CLEANER: Cleaner = {
    name: "Geidy Cabrera", role: "Founder & Head Cleaner", bio: "With over 15 years of experience, Geidy founded SparkleClean with a passion for creating pristine and healthy living spaces.", imageUrl: "https://i.ibb.co/Vt9rQy7/cleaner.png", contact: "+14752080329",
};