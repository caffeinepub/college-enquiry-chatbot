import { useEffect } from 'react';
import { Layout } from '../components/Layout';
import { ChatInterface } from '../components/ChatInterface';
import { useChat } from '../hooks/useChat';
import { useGetAllColleges, useAddCollege } from '../hooks/useQueries';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';
import { AlertCircle } from 'lucide-react';

export default function ChatPage() {
  const { data: colleges, isLoading: isLoadingColleges } = useGetAllColleges();
  const addCollegeMutation = useAddCollege();

  // Initialize with sample college data if none exists
  useEffect(() => {
    if (colleges && colleges.length === 0 && !addCollegeMutation.isPending) {
      addCollegeMutation.mutate({
        name: 'University of Excellence',
        description:
          'A premier institution dedicated to academic excellence and student success. We offer world-class education with state-of-the-art facilities and experienced faculty.',
        admissionsRequirements:
          'High school diploma or equivalent, minimum GPA of 3.0, SAT/ACT scores, letters of recommendation, and personal statement. International students must provide TOEFL/IELTS scores.',
        courses: [
          'Computer Science',
          'Business Administration',
          'Engineering',
          'Psychology',
          'Biology',
          'Mathematics',
          'English Literature',
          'Economics',
        ],
        programs: [
          'Bachelor of Science',
          'Bachelor of Arts',
          'Master of Science',
          'Master of Business Administration',
          'PhD Programs',
        ],
        campusFacilities:
          'Modern library with 500,000+ volumes, state-of-the-art laboratories, sports complex with Olympic-size pool, student recreation center, on-campus housing for 5,000 students, multiple dining halls, medical center, and career services center.',
        campusLife:
          'Vibrant campus community with 200+ student organizations, Division I athletics, Greek life, cultural events, concerts, guest speakers, volunteer opportunities, and study abroad programs in 30+ countries.',
        applicationDeadlines:
          'Early Decision: November 1st, Regular Decision: January 15th, Transfer Students: March 1st (Fall), October 1st (Spring). Financial aid priority deadline: February 1st.',
        tuitionFees:
          'Undergraduate: $45,000 per year. Graduate: $35,000 per year. Room and board: $15,000 per year. Books and supplies: approximately $1,200 per year. Total estimated cost: $61,200 per year.',
        scholarships:
          'Merit-based scholarships ranging from $5,000 to full tuition. Need-based financial aid available. Athletic scholarships for qualified student-athletes. Departmental scholarships for specific majors. Over 80% of students receive some form of financial assistance.',
        contactInfo:
          'Admissions Office: admissions@universityofexcellence.edu, Phone: (555) 123-4567. Campus Address: 123 University Drive, College Town, ST 12345. Office Hours: Monday-Friday 9AM-5PM.',
        faq: [
          {
            question: 'admissions',
            answer:
              'Our admissions process requires a high school diploma, minimum 3.0 GPA, standardized test scores (SAT/ACT), letters of recommendation, and a personal statement. We review applications holistically, considering academic achievement, extracurricular activities, and personal qualities. The application deadline for Fall admission is January 15th.',
          },
          {
            question: 'requirements',
            answer:
              'Admission requirements include: high school diploma or equivalent, minimum GPA of 3.0, SAT scores of 1200+ or ACT scores of 25+, two letters of recommendation, personal statement, and completed application form. International students must also provide TOEFL (80+) or IELTS (6.5+) scores.',
          },
          {
            question: 'courses',
            answer:
              'We offer a wide range of courses including Computer Science, Business Administration, Engineering, Psychology, Biology, Mathematics, English Literature, and Economics. Each program features expert faculty, hands-on learning opportunities, and industry connections.',
          },
          {
            question: 'programs',
            answer:
              'Our academic programs include Bachelor of Science, Bachelor of Arts, Master of Science, Master of Business Administration, and PhD programs across various disciplines. We also offer certificate programs and continuing education courses.',
          },
          {
            question: 'tuition',
            answer:
              'Undergraduate tuition is $45,000 per year, graduate tuition is $35,000 per year. Room and board costs approximately $15,000 per year. The total estimated annual cost including books and supplies is around $61,200. Financial aid and scholarships are available.',
          },
          {
            question: 'fees',
            answer:
              'Annual tuition for undergraduates is $45,000 and for graduates is $35,000. Additional costs include room and board ($15,000), books and supplies ($1,200), and personal expenses. Payment plans are available to help manage costs.',
          },
          {
            question: 'scholarships',
            answer:
              'We offer merit-based scholarships from $5,000 to full tuition, need-based financial aid, athletic scholarships, and departmental scholarships. Over 80% of our students receive some form of financial assistance. Apply early to maximize your scholarship opportunities.',
          },
          {
            question: 'financial aid',
            answer:
              'Financial aid is available through scholarships, grants, work-study programs, and student loans. Complete the FAFSA by February 1st for priority consideration. Our financial aid office can help you explore all available options to make education affordable.',
          },
          {
            question: 'campus',
            answer:
              'Our beautiful campus features modern facilities including a library with 500,000+ volumes, state-of-the-art labs, sports complex with Olympic pool, recreation center, on-campus housing for 5,000 students, multiple dining options, medical center, and career services.',
          },
          {
            question: 'facilities',
            answer:
              'Campus facilities include a modern library, advanced laboratories, sports complex, student recreation center, on-campus housing, dining halls, medical center, career services center, and technology-equipped classrooms. All facilities are accessible and well-maintained.',
          },
          {
            question: 'housing',
            answer:
              'We offer on-campus housing for up to 5,000 students in modern residence halls. Options include traditional dorms, suite-style living, and apartment-style housing. All rooms have high-speed internet, and residence halls feature study lounges, laundry facilities, and 24/7 security.',
          },
          {
            question: 'campus life',
            answer:
              'Campus life is vibrant with 200+ student organizations, Division I athletics, Greek life, cultural events, concerts, guest speakers, and volunteer opportunities. We also offer study abroad programs in over 30 countries and numerous leadership development opportunities.',
          },
          {
            question: 'activities',
            answer:
              'Students can participate in 200+ clubs and organizations, attend cultural events and concerts, join Greek life, play intramural sports, volunteer in the community, and study abroad. There are activities for every interest, from academic clubs to recreational groups.',
          },
          {
            question: 'deadline',
            answer:
              'Application deadlines are: Early Decision - November 1st, Regular Decision - January 15th, Transfer Students - March 1st (Fall) and October 1st (Spring). The financial aid priority deadline is February 1st. We recommend applying early for the best consideration.',
          },
          {
            question: 'apply',
            answer:
              'To apply, submit your application through our online portal by January 15th for Fall admission. Required materials include transcripts, test scores, letters of recommendation, and a personal statement. Application fee is $75 (fee waivers available). Check your application status online.',
          },
          {
            question: 'contact',
            answer:
              'Contact our Admissions Office at admissions@universityofexcellence.edu or call (555) 123-4567. We are located at 123 University Drive, College Town, ST 12345. Office hours are Monday-Friday, 9AM-5PM. You can also schedule a campus visit through our website.',
          },
          {
            question: 'visit',
            answer:
              'Campus visits are available Monday-Friday and select Saturdays. Schedule a tour through our website or call (555) 123-4567. Tours include classroom visits, residence hall tours, meetings with faculty, and lunch in our dining hall. Virtual tours are also available.',
          },
          {
            question: 'majors',
            answer:
              'We offer majors in Computer Science, Business Administration, Engineering, Psychology, Biology, Mathematics, English Literature, Economics, and many more. Students can also design custom interdisciplinary majors with faculty approval.',
          },
          {
            question: 'athletics',
            answer:
              'Our Division I athletics program includes 20 varsity sports teams. We also offer club sports, intramural leagues, and recreational fitness programs. Athletic facilities include an Olympic-size pool, fitness center, tennis courts, and multiple playing fields.',
          },
          {
            question: 'international',
            answer:
              'International students are welcome! Requirements include TOEFL (80+) or IELTS (6.5+) scores, transcript evaluation, financial documentation, and visa support. We offer ESL programs, international student orientation, and dedicated support services.',
          },
          {
            question: 'transfer',
            answer:
              'Transfer students should apply by March 1st for Fall or October 1st for Spring. We accept up to 60 transfer credits. Requirements include college transcripts (minimum 2.5 GPA), course descriptions, and personal statement. Transfer credit is evaluated on a case-by-case basis.',
          },
        ],
      });
    }
  }, [colleges, addCollegeMutation]);

  const collegeId = colleges && colleges.length > 0 ? colleges[0].id : null;
  const { messages, sendMessage, isLoading, error } = useChat(collegeId);

  if (isLoadingColleges || addCollegeMutation.isPending) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <Skeleton className="h-[300px] w-full rounded-2xl" />
          </div>
          <div className="max-w-4xl mx-auto">
            <Skeleton className="h-[600px] w-full rounded-2xl" />
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="mb-8 relative overflow-hidden rounded-2xl shadow-warm">
          <img
            src="/assets/generated/campus-hero.dim_1200x400.png"
            alt="College Campus"
            className="w-full h-[300px] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/50 to-transparent flex items-end">
            <div className="p-8">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-2">
                Welcome to {colleges?.[0]?.name || 'Our College'}
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl">
                {colleges?.[0]?.description ||
                  'Get instant answers to all your questions about admissions, courses, campus life, and more.'}
              </p>
            </div>
          </div>
        </div>

        {/* Chat Interface */}
        <div className="max-w-4xl mx-auto">
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                {error.message || 'An error occurred. Please try again.'}
              </AlertDescription>
            </Alert>
          )}

          {collegeId === null ? (
            <Alert className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Initializing college information... Please wait.
              </AlertDescription>
            </Alert>
          ) : (
            <div className="h-[600px]">
              <ChatInterface
                messages={messages}
                onSendMessage={sendMessage}
                isLoading={isLoading}
                disabled={collegeId === null}
              />
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
