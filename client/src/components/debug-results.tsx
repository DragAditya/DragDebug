import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle, CheckCircle } from "lucide-react";
import CodeEditor from "./code-editor";

interface DebugResultsProps {
  results?: {
    issues: string[];
    explanation: string;
    correctedCode?: string;
  };
  language?: string;
}

export default function DebugResults({ results, language = "javascript" }: DebugResultsProps) {
  if (!results) {
    return (
      <Card className="min-h-[400px]">
        <CardContent className="p-4 h-full flex items-center justify-center text-muted-foreground">
          Debug results will appear here
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {results.correctedCode && (
        <Card>
          <CardContent className="p-4">
            <h3 className="font-medium mb-2">Corrected Code</h3>
            <div className="mb-4">
              <CodeEditor
                value={results.correctedCode}
                onChange={() => {}}
                language={language}
                readOnly
              />
            </div>

            <div className="mt-4 pt-4 border-t">
              <h4 className="font-medium mb-2 flex items-center gap-2">
                {results.issues.length > 0 ? (
                  <AlertCircle className="h-5 w-5 text-destructive" />
                ) : (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                )}
                Issues Found
              </h4>
              <ul className="space-y-2 mb-4">
                {results.issues.map((issue, index) => (
                  <li key={index} className="text-sm text-muted-foreground">
                    • {issue}
                  </li>
                ))}
              </ul>

              <div className="mt-4 pt-4 border-t">
                <h4 className="font-medium mb-2">Explanation</h4>
                <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                  {results.explanation}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}