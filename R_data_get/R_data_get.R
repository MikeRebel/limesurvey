# first limer (check version: must be recent) must be installed
if(!require("devtools")) {
     
     install.packages("devtools")
     library("devtools")
     
}

install_github("cloudyr/limer")
#############################################################

library(limer)
library(RCurl)

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
w <- get_responses(iSurveyID=897758, sLanguageCode='', sResponseType='short') #для lime версии 5
write.csv(w,"w.csv")

###Только для lime версии 2###
# Доступны в call_limer() все методы из ссылки

w_get <- call_limer(method = "export_responses", 
                    params = list(iSurveyID = 897758, #id опроса из survey_df
                                  sDocumentType = "csv", #pdf, csv, xls, doc, json
                                  sLanguageCode = "", #The language to be used "" = all
                                  sCompletionStatus = "complete", #'complete','incomplete' or 'all' 
                                  sHeadingType = "code", #'code','full' or 'abbreviated' 
                                  sResponseType = "short" #'short' or 'long' 
                                  )
                    )
raw_csv <- rawToChar(base64enc::base64decode(w_get))
csv <- read.csv(textConnection(raw_csv), 
         stringsAsFactors = FALSE, 
         header = TRUE,
         sep = ",", #посмотреть, какой разделитель в raw_csv и указать его тут
         encoding = "UTF-8", #установить тут кодировку, в которой скачан raw_csv. Обычно UTF-8
         fileEncoding = "windows-1251", #установить тут кодировку, в которую сохранится файл. Список всех кодировок - iconvlist()
         )

write.csv2(csv,"w.csv")
###Конец только для lime версии 2###
