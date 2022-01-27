# first limer (check version: must be recent) must be installed
if(!require("devtools")) {
     
     install.packages("devtools")
     library("devtools")
     
}

install_github("cloudyr/limer")
#############################################################

library(limer)

source("options.R", encoding = "UTF8", local = TRUE)


# first get a session access key
get_session_key()

# list all surveys. A dataframe is returned
survey_df <- call_limer(method='list_surveys')
print(survey_df)
#    sid           surveyls_title startdate             expires active
#1  999999  XXXX               NA 2016-03-08 15:20:30      Y
#2  999998  XXXX               NA   <NA>      Y

#Read the data of the first survey (sid=999999) into a data.frame. 
#Notice that the default sLanguageCode = en, so maybe you have to 
#specify another language (here: All languages)
w <- get_responses(iSurveyID=897758, sLanguageCode='ru', sResponseType='short')

w_get <- call_limer(method = "export_responses", 
                    params = list(iSurveyID = 12345, 
                                  sDocumentType = "csv", 
                                  sLanguageCode = "ru", 
                                  sCompletionStatus = "complete", 
                                  sHeadingType = "code", 
                                  sResponseType = "long"
                                  )
                    )

w <- base64_to_df(w)
