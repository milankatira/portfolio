import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { TabsContent } from '../ui/tabs';
import { getResponsesBySectionId } from '@/actions/insight.action';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { ArrowDownToLine, Loader2 } from 'lucide-react';
import { Eye } from 'lucide-react';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface Field {
  label: string;
  answer: string;
  type: string;
}

interface Submission {
  submissionId: string;
  fields: Field[];
  createdAt: string;
}

interface Section {
  id: string;
  title: string;
  description: string;
  type: string;
}

interface Response {
  submissionId: string;
  answer: string;
  createdAt: string;
  formField: {
    label: string;
    type: string;
  };
}

interface FeedbackTableProps {
  section: Section;
  groupResponsesBySubmission: (
    responses: Response[]
  ) => Record<string, Submission>;
  dateRange: {
    from: Date | undefined;
    to: Date | undefined;
  };
  isActive: boolean;
}

const FeedbackTable: React.FC<FeedbackTableProps> = ({
  section,
  groupResponsesBySubmission,
  dateRange,
  isActive,
}) => {
  const [response, setResponse] = useState<Response[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const itemsPerPage = 10; // Customize the items per page

  const hasResponses = response.length > 0;

  useEffect(() => {
    async function fetchResponses() {
      if (!dateRange.from || !dateRange.to) return;

      setIsLoading(true); // Show loader while fetching data
      try {
        const data = await getResponsesBySectionId(
          section.id,
          dateRange.from,
          dateRange.to,
          currentPage,
          itemsPerPage
        );

        console.log(
          data,
          'data',
          section.id,
          dateRange.from,
          dateRange.to,
          currentPage,
          itemsPerPage
        );
        // @ts-expect-error - Response type mismatch from API
        setResponse(data.responses);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error('Error fetching responses:', error);
      } finally {
        setIsLoading(false); // Hide loader after data fetch
      }
    }

    fetchResponses();
  }, [
    section.id,
    dateRange.from,
    dateRange.to,
    currentPage,
    itemsPerPage,
    isActive,
  ]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const groupedResponses = groupResponsesBySubmission(response);

  const handleDownloadCSV = async () => {
    if (!dateRange.from || !dateRange.to) return;

    try {
      // Fetch all responses for this section
      const data = await getResponsesBySectionId(
        section.id,
        dateRange.from,
        dateRange.to
      );

      // Prepare CSV rows
      const csvRows = [
        [`Section: ${section.title}`], // Add section name
        ['Submission ID', 'Field Label', 'Answer', 'Submitted At'], // Header row
      ];

      // Add response data
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      Object.values(groupResponsesBySubmission(data.responses)).forEach(
        (submission) => {
          submission.fields.forEach((field) => {
            csvRows.push([
              submission.submissionId,
              field.label,
              field.answer,
              new Date(submission.createdAt).toLocaleString(),
            ]);
          });
        }
      );

      // Convert to CSV string
      const csvContent = csvRows.map((row) => row.join(',')).join('\n');

      // Create and download file
      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${section.title.replace(/\s+/g, '_')}-responses-${new Date().toISOString()}.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading CSV:', error);
    }
  };

  const renderFieldValue = (field: Field) => {
    console.log(field, 'field');
    if (field.type === 'IMAGE') {
      return (
        <Dialog>
          <DialogTrigger asChild>
            <Button variant='ghost' size='sm' className='gap-2'>
              <Eye className='h-4 w-4' />
              View Image
            </Button>
          </DialogTrigger>
          <DialogContent className='max-w-3xl'>
            <div className='relative aspect-video w-full overflow-hidden rounded-lg'>
              <img
                src={field.answer}
                alt={field.label}
                className='object-contain w-full h-full'
                loading='lazy'
              />
            </div>
          </DialogContent>
        </Dialog>
      );
    }
    return (
      <span className='text-sm text-muted-foreground'>{field.answer}</span>
    );
  };

  return (
    <TabsContent key={section.id} value={section.id}>
      <Card className='shadow-md'>
        <CardHeader className='flex flex-row justify-between'>
          <div>
            <CardTitle className='text-xl font-semibold'>
              {section.title}
            </CardTitle>
            <p className='text-sm text-muted-foreground'>
              {section.description}
            </p>
          </div>
          <Button
            onClick={handleDownloadCSV}
            disabled={isLoading || !hasResponses}
            className='gap-2'
          >
            <ArrowDownToLine className='h-4 w-4' />
            Download CSV
          </Button>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className='flex justify-center py-16'>
              <Loader2 className='animate-spin w-6 h-6 text-muted-foreground' />
            </div>
          ) : hasResponses ? (
            <>
              <div className='overflow-x-auto min-h-10'>
                <Table>
                  <TableHeader>
                    <TableRow className='bg-muted/50'>
                      <TableHead className='w-[150px] font-semibold'>
                        Submission ID
                      </TableHead>
                      <TableHead className='font-semibold'>Responses</TableHead>
                      <TableHead className='w-[200px] font-semibold'>
                        Submitted At
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {Object.values(groupedResponses).map((submission) => (
                      <TableRow
                        key={submission.submissionId}
                        className='hover:bg-muted/50 transition-colors'
                      >
                        <TableCell className='font-medium'>
                          {submission.submissionId}
                        </TableCell>
                        <TableCell>
                          <div className='space-y-2'>
                            {submission.fields.map((field, index) => (
                              <div
                                key={`${submission.submissionId}-${index}`}
                                className='flex gap-2 items-start'
                              >
                                <span className='font-medium text-sm min-w-[120px]'>
                                  {field.label}:
                                </span>
                                {renderFieldValue(field)}
                              </div>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell className='text-sm text-muted-foreground'>
                          {new Date(submission.createdAt).toLocaleString()}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              <div className='flex justify-between items-center mt-6'>
                <p className='text-sm text-muted-foreground w-24'>
                  Page {currentPage} of {totalPages}
                </p>
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        onClick={() => handlePageChange(currentPage - 1)}
                        // @ts-expect-error - disabled prop not in type definition
                        disabled={currentPage === 1}
                      />
                    </PaginationItem>
                    {Array.from({ length: totalPages }).map((_, index) => (
                      <PaginationItem key={index}>
                        <PaginationLink
                          isActive={index + 1 === currentPage}
                          onClick={() => handlePageChange(index + 1)}
                        >
                          {index + 1}
                        </PaginationLink>
                      </PaginationItem>
                    ))}
                    <PaginationItem>
                      <PaginationNext
                        aria-disabled={currentPage === totalPages}
                        onClick={() =>
                          currentPage !== totalPages &&
                          handlePageChange(currentPage + 1)
                        }
                        // @ts-expect-error - disabled prop not in type definition
                        disabled={currentPage === totalPages}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            </>
          ) : (
            <div className='text-center py-16 text-muted-foreground'>
              No responses for this section yet.
            </div>
          )}
        </CardContent>
      </Card>
    </TabsContent>
  );
};

export default FeedbackTable;
